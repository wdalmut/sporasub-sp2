
const { Transform } = require('stream');
const util = require('util');

function ToJsonTransform(options) {
    options = Object.assign({}, options, {objectMode: true});

    if (!(this instanceof ToJsonTransform)) {
        return new ToJsonTransform(options);
    }
    Transform.call(this, options);

    this.data = [];
}
util.inherits(ToJsonTransform, Transform);

ToJsonTransform.prototype._transform = function(data, encoding, callback) {
  if (data[0] != 0x3c && data[1] != 0x3c) {
    callback(null, this.parsePage(data));
  } else {
    callback();
  }
};

ToJsonTransform.prototype.parsePage = function(data) {
  return {
    date: "20"+data[0]+"-"+("0"+(data[1])).slice(-2)+"-"+("0"+data[2]).slice(-2)+" "+("0"+data[3]).slice(-2)+":"+("0"+data[4]).slice(-2)+":"+("0"+data[5]).slice(-2),
    dive: ("0"+data[8]).slice(-2)+":"+("0"+data[9]).slice(-2)+":"+("0"+data[10]).slice(-2),
    surface: ("0"+data[11]).slice(-2)+":"+("0"+data[12]).slice(-2)+":"+("0"+data[13]).slice(-2),
    depth: (data[17] | (data[18]<<8))/100,
    minTemp: (data[21] | (data[22]<<8))/10,
    maxTemp: (data[23] | (data[24]<<8))/10,
    calories: (data[25] | (data[26]<<8)),
    minHeart: (data[27] | (data[28]<<8)),
    maxHeart: (data[30] | (data[31]<<8)),
    details: ((data) => {
      let map = [];

      for (let i=0; i<data.length; i+=5) {

        if (data[i] == 0x7a) {
          break;
        }

        map.push({
          depth: (data[i] | (data[i+1]<<8))/100,
          temperature: (data[i+2] | (data[i+3])<<8)/10,
          heartRate: data[i+4],
        });
      }

      return map;
    })(data.slice(49)),
  };
};

module.exports = ToJsonTransform;


