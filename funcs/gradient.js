const Utils = require('./../utils');
const d3 = require('d3-scale');

const { getDomain, getRange } = Utils;
const _ = require('lodash');

// 渐变
const funcs = {
  log: d3.scaleLog,
  pow: d3.scalePow,
  linear: d3.scaleLinear
};

const checkType = (d, valueType) => {
  if (!d) return false;
  if (valueType === 'gradient') return true;
  if (typeof (d) !== 'object') return false;
  const type = d.type || valueType;
  const value = d.type ? d.value : d;
  if (type !== 'gradient') return false;
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

const genFloorBy = (k, len) => {
  if (!k) return d => d;
  k = len / k;
  return d => Math.floor(d / k) * k;
};

const generate = (o) => {
  const d3Func = getFunc(o);
  const domain = getDomain(o);
  const dLen = domain[1] - domain[0];
  const floorBy = genFloorBy(o.domain.divideN, dLen);
  const range = getRange(o);
  const func = d3Func().domain(domain).range(range).clamp(domain);
  const { key } = o;
  return (v) => {
    if (typeof v === 'object') v = _.get(v, key);
    return func(floorBy(v));
  };
};

module.exports = { generate, checkType };

