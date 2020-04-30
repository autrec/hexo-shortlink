'use strict';

const crc32 = require('./crc32');
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

/**
 * 检查重复
 */
var shortlinkObj = {}
let checkRepeat = function (hasCrc, crc) {
    if (shortlinkObj[hasCrc] && shortlinkObj[hasCrc].indexOf(crc) > -1) {
        crc++;
        return checKCrc(hasCrc, crc);
    } else {
        return crc;
    }
}
/**
 * 处理短连接
 * @param {*} data 
 */
let shortlink = function (data) {
    if (data.layout == 'post') {
        //source = _posts/books/abook.md, 去掉 _posts,去掉abook.md,拼上shrolink 组成 books/xxxxxx
        let source = data.source.split("/");
        source.shift();
        let sourceEnd = source.pop();
        let hasCrc = "sl-" + source.join("-");
        shortlinkObj[hasCrc] = [];
        let shortlink = data.shortlink;
        if (shortlink) {
            source.push(shortlink)
            data.shortlink = source.join("/");
        } else {
            let sourceEndArr = sourceEnd.split(".");
            sourceEndArr.pop();
            let fileName = sourceEndArr.join(".");
            let crc = crc32.str(fileName) >>> 0;
            crc = checkRepeat(hasCrc, crc);
            shortlink = crc.toString(16);
            source.push(shortlink)
            data.shortlink = source.join("/");
            let tmpPost = front.parse(data.raw);
            tmpPost.shortlink = shortlink;
            let postStr = front.stringify(tmpPost);
            postStr = '---\n' + postStr;
            fs.writeFileSync(data.full_source, postStr, 'utf-8');
            this.log.i("Generate link %s for post [%s]", data.shortlink, data.title);
        }
        shortlinkObj[hasCrc].push(shortlink);
    }
    return data
}



module.exports = shortlink;