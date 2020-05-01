# hexo-shortlink

A Hexo plugin for generate static post link based on post file name.

## Install

Add plugin to Hexo:

```
npm install hexo-shortlink --save
```

Modify permalink in config.yml file:

```
permalink: :shortlink.html
```

## Sample

The generated link will look like the following:

```
source: _posts/books/a-book.md
permalink: /books/261f97f7.html

source: _posts/hello-word.md
permalink: /b1d4025b.html

source: _posts/books/computer/a-book.md
permalink: /books/computer/261f97f7.html
```

## Customize permalink

Set shortlink in front-matter, example:

```
---
title: 'hello word'
shortlink: myshortlink
---
```

The permalink will look like the following:

```
/myshortlink.html
/books/myshortlink.html
/books/computer/myshortlink.html
```

## ThanksFor

[Rozbo](https://github.com/Rozbo/hexo-abbrlink) [sheetjs](https://github.com/SheetJS/js-crc32)
