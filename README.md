# [hexo-shortlink](https://iout.io/open/hexoshortlink)

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

### version 1.0
```
source: _posts/books/a-book.md
permalink: /books/261f97f7.html

source: _posts/hello-word.md
permalink: /b1d4025b.html

source: _posts/books/computer/a-book.md
permalink: /books/computer/261f97f7.html
```
### version 2.0
need set config :
```
shortlink:
  include: open/share,books # more than one used "," split
```
```
source: _posts/hello-word.md
permalink: /b1d4025b.html

source: _posts/open/share/a-book.md
permalink: /open/share/261f97f7.html

source: _posts/open/a-book.md
permalink: /261f97f7.html

source: _posts/books/a-book.md
permalink: /books/261f97f7.html

source: _posts/books/computer/a-book.md
permalink: /261f97f7.html
```

## ThanksFor

[Rozbo](https://github.com/Rozbo/hexo-abbrlink) [sheetjs](https://github.com/SheetJS/js-crc32)
