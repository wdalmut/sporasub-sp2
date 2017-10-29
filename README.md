# Sporasub SP2 - Dive reader

A set of streams that read `.dive` files from Sporasub SP2 diving watch

```js
const sp2 = require('sp2');

fs.createReadStream('my.dive')
    .pipe(sp2.page())
    .on('data', (chunk) => {
    });
;

```

