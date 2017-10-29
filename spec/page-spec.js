const fs = require('fs'),
  path = require('path'),
  page = require('../page')
;

describe("Sporasub", () => {
  let input = null;

  beforeEach(() => {
    input = fs.createReadStream(path.join(__dirname, 'base.dive'));
  });

  it ("should chunk in pages", (done) => {

    let test = fs.createWriteStream(path.join(__dirname, 'c'));

    let data = 0;

    input
      .pipe(page())
      .on('data', (chunk) => {
        ++data;
        if (data > 1){
          expect(chunk[0]).toEqual(0x11);
        }
      })
      .on('finish', () => {
        expect(data).toEqual(12);
        done();
      });
  });
});
