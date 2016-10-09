const chai = require('chai');
const config = require('../index');
const Config = require('../lib/Config');

describe('Config object', () => {
  describe('#init()', () => {
    it('should change global config', () => {
      config.init({
        srcFolder: 'tests/data',
        type: 'json'
      });

      chai.expect(() => {
        config.load('myconfig');
      }).to.throw(/Cannot find config file: (\/.*\/tests\/data\/(.*)\.json$)/);

    });
  });
  beforeEach((done) => {
    config.init({
      srcFolder: 'tests/config',
      type: 'js'
    });
    done();
  });
  describe('#load()', () => {
    it('should require a config name', () => {
      chai.expect(() => {
        config.load('');
      }).to.throw(/No config name provided/);
    });

    it('should return an instance of Config', () => {
      chai.expect(config.load('myconfig')).to.be.an.instanceof(Config);
    });

    it('should allow to extend other configs', () => {
      const baseConfig = config.load('base');
      const commonConfig = config.load('common');
      const myConfig = config.load('myconfig');

      chai.expect(baseConfig.get('version')).to.not.deep.equal(commonConfig.get('version'));
      chai.expect(baseConfig.get('name')).to.not.deep.equal(myConfig.get('name'));
    });

    it('should not allow circular config extension', () => {
      chai.expect(() => {
        config.load('a');
      }).to.throw(/Circular config loading detected/);
    });
  });

  describe('#Config.get()', () => {
    it('should get a config value by name', () => {
      const myConfig = config.load('myconfig');
      chai.expect(myConfig.get('name')).to.equal('config-test');
    });
    it('should get a nested value', () => {
      const myConfig = config.load('myconfig');
      chai.expect(myConfig.get('site.name')).to.equal('My Website');
    });
    it('should allow to set a default value if the config value is not set or get a NULL value otherwise', () => {
      const myConfig = config.load('myconfig');

      chai.expect(myConfig.get('non-existing-attribute', 2)).to.equal(2);
      chai.expect(myConfig.get('non-existing-attribute')).to.be.null;

    });
  });
});