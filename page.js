
const { Transform } = require('stream');
const util = require('util');

function PageTransform(options) {
    if (!(this instanceof PageTransform)) {
        return new PageTransform(options);
    }
    Transform.call(this, options);

    this.data = [];
}
util.inherits(PageTransform, Transform);

PageTransform.prototype._transform = function(data, encoding, callback) {
  for (let i=0; i<data.length; i++) {
    this.data.push(data[i]);

    if ("61616161616161616161616161616161" == this.data.slice(-16).join('')) {
      let buffer = this.data.slice(0, -16);
      this.data = [];

      this.push(Buffer.from(buffer.slice()));
    }
  }

  callback();
};

module.exports = PageTransform;

