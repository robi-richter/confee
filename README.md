# Confee

## About
This is a simple module to easily manage configurations for NodeJS applications.
You can extend configurations, so it's easy to override other configurations from a base file for example 

## Usage:

```javascript
const config = require('node-config');

config.init({
  srcFolder:'./config', // path to config files
  type: 'js'  // or 'json'
});

// load config.
const configObj = config.load('myconfig');

// access data from the config object
configObj.get('site.email');
configObj.get('email.smtp.username');
```

Config files can extend other config files:

base.js:
```javascript
module.exports = {
  version: '1.2.4',
  name: 'foo'
};
```

development.js:
```javascript
module.exports = {
  extends: 'base',
  name: 'bar'
};
```


