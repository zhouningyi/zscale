const Utils = require('./utils');
const {switchValue} = Utils;
const d3 = require('d3-scale');

const gradient = require('./funcs/gradient');

const funcs = {gradient};

const getFunc = (name) => funcs[name];

const generate = (d) => {
  const {type, value} = d;
  const func = funcs[type];
  return func.generate(value);
};

module.exports = {generate};


