const builder = require('./lib/builder');

const options = {
  srcFolder: 'config',
  type: 'js'
};

module.exports.init = ({srcFolder, type} = {}) => {
  if(srcFolder) {
    options.srcFolder = srcFolder;
  }

  if (type) {
    options.type = type;
  }
};

module.exports.load = (name, {srcFolder, type} = {}) => {
  return builder({
    name,
    srcFolder: srcFolder ? srcFolder : options.srcFolder,
    type: type ? type : options.type
  });
};