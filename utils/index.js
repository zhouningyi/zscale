const Utils = require('bcore/utils');


// 转换格式 {min:1, max:2} => [1,2]
const _formatRange = (range) => {
  if (Array.isArray(range)) return range;
  return [range.min, range.max];
};

const getRange = d => _formatRange(d.range);

// 转换格式 {min:1, max:2} => [1,2]
const _formatDomain = _formatRange;

const getDomain = d => _formatDomain(d.domain);

module.exports = Object.assign({}, Utils, { getRange, getDomain });

