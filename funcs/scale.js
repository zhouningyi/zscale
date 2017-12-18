const Utils = require('./../utils');
const d3 = require('d3-scale');

const { getDomain, getRange } = Utils;

const funcs = {
  log: d3.scaleLog,
  pow: d3.scalePow,
  linear: d3.scaleLinear
};

const checkType = (d, valueType) => {
  if (!d) return false;
  if (valueType === 'scale') return true;
  if (typeof (d) !== 'object') return false;
  const type = d.type || valueType;
  const value = d.type ? d.value : d;
  if (type !== 'scale') return false;
  if (!value || !value.range || !value.domain) return false;
  return true;
};

const getFunc = (o) => {
  const type = o.easing || o.scale || 'linear';
  if (!type) return console.log(o, 'easing参数不存在');
  const func = funcs[type];
  if (!func) return console.log(o, '函数不存在');
  return func;
};

const generate = (o) => {
  const d3Func = getFunc(o);
  const domain = getDomain(o);
  const range = getRange(o);
  return d3Func().domain(domain).range(range);
};

module.exports = { generate, checkType };

