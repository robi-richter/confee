
class Config {

  constructor(data) {
    Object.defineProperty(this, '_data', {
      value: data || {},
      writable: false,
      enumerable: false,
      configurable: false
    });
  }

  get env() {
    return process.env.NODE_ENV
  }

  /**
   * Get a config attribute. Nested attributes can be fetched using dot notation
   * Ex: config.get('db')
   *     config.get('db.driver')
   * Null value is returned if the attribute is not found
   *
   * @param {String} path
   * @param {*} defaultValue
   * @returns {*}
   */
  get(path, defaultValue = null) {

    const pathArray = path.split('.') || [];

    return pathArray.reduce((data, attribute) => {
      if(!data || !data[attribute] || !data.hasOwnProperty(attribute)) {
        return defaultValue || null;
      }
      return data[attribute];
    }, this._data);
  }
}

module.exports = Config;
