# Sporasub SP2 - Dive reader

A set of streams that read `.dive` files from Sporasub SP2 diving watch

```js
const page = require('sp2/page');
const json = require('sp2/to-json');

fs.createReadStream('my.dive')
    .pipe(page())
    .pipe(json())
    .on('data', (dive) => {
        console.log(dive); // object
    });
;

```

