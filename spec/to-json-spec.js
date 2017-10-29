const fs = require('fs'),
  path = require('path'),
  page = require('../page')
  toJson = require('../to-json')
;

describe("Sporasub", () => {
  let input = null;

  beforeEach(() => {
    input = fs.createReadStream(path.join(__dirname, 'base.dive'));
  });

  it ("should pages to json", (done) => {

    let test = fs.createWriteStream(path.join(__dirname, 'c'));

    let data = 0;

    input
      .pipe(page())
      .pipe(toJson())
      .on('data', (trace) => {
        expect(trace.depth).not.toBe(undefined);
      })
      .on('finish', () => {
        done();
      });
  });
});

