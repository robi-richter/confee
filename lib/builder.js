const fs = require('fs');
const path = require('path');
const merge = require('lodash.merge');
const omit = require('lodash.omit');
const Config = require('./Config');

module.exports = build;

const supportedFileTypes = ['js', 'json'];

function build({ srcFolder, name, type } = {
  srcFolder: '.',
  name: '',
  type: 'js'
}) {
  return new Config(fetchConfigData(srcFolder, name, type));
}

function fetchConfigData(srcFolder, name, type = 'js', configsLoaded = []) {
  if (!name) {
    throw new Error('No config name provided');
  }

  if(supportedFileTypes.indexOf(type) === -1) {
    throw new Error(`Unsupported file extension '${type}'`);
  }

  const fileName = `${name}.${type}`;
  const configFile = path.resolve(path.join(srcFolder, fileName));

  try {
    fs.lstatSync(configFile);
  } catch (e) {
    throw new Error(`Cannot find config file: ${configFile}`);
  }

  const configData = require(configFile);
  configsLoaded.push(name);
  if (configData && configData.extends) {
    if(configsLoaded.indexOf(configData.extends) !== -1) {
      throw new Error('Circular config loading detected');
    }
    return merge({}, fetchConfigData(srcFolder, configData.extends, type, configsLoaded), omit(configData, ['extends']));
  }

  return configData;
}
