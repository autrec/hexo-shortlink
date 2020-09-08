'use strict';

const crc32 = require('./crc32');
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

var shortlinkObj = {};
/**
 * check repeat
 * @param {*} hasCrc 
 * @param {*} crc 
 */
let checkRepeat = function (hasCrc, crc) {
    if (shortlinkObj[hasCrc] && shortlinkObj[hasCrc].indexOf(crc) > -1) {
        crc++;
        return checKCrc(hasCrc, crc);
    } else {
        return crc;
    }
}
/**
 * short link
 * @param {*} data 
 */
let shortlink = function (data) {
    if (data.layout == 'post') {
        //source = _posts/books/abook.md, remove _posts and abook.md, add shrolink to books/xxxxxx
        let source = data.source.split("/");
        source.shift();
        let sourceEnd = source.pop();
        let hasCrc = "sl-" + source.join("-");
        let shortlink = data.shortlink;
        let shortlinkCrc;
        if (shortlink) {
            let shortlinkCrcs = shortlink.split("/");
            shortlinkCrc = shortlinkCrcs.pop();
            //source.push(shortlink)
            //data.shortlink = source.join("/");
        } else {
            let sourceEndArr = sourceEnd.split(".");
            sourceEndArr.pop();
            let fileName = sourceEndArr.join(".");
            let crc = crc32.str(fileName) >>> 0;
            crc = checkRepeat(hasCrc, crc);
            shortlinkCrc = crc.toString(16);
            let chang = false;
            if( this.config.shortlink && this.config.shortlink.include){
                let includes = this.config.shortlink.include.split(",");
                for(let i in includes){
                    if (includes[i] == source.join("/")){
                        chang = true;
                        break;
                    }
                }
            }
            source.push(shortlinkCrc);
            if(chang == true){
                data.shortlink = source.join("/");
            }else {
                data.shortlink = shortlinkCrc;
            }
            let tmpPost = front.parse(data.raw);
            tmpPost.shortlink = data.shortlink;
            let postStr = front.stringify(tmpPost);
            postStr = '---\n' + postStr;
            fs.writeFileSync(data.full_source, postStr, 'utf-8');
        }
        if (!shortlinkObj[hasCrc]) shortlinkObj[hasCrc] = [];
        shortlinkObj[hasCrc].push(shortlinkCrc);
        this.log.i("Generate link %s for post [%s]", data.shortlink, data.title);
    }
    return data
}

module.exports = shortlink;