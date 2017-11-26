

const d3 = require('d3-scale');


const fn = d3.scaleLinear().domain([1,10], 3).range([1,100])

// const d = fn.ticks(100)

console.log(fn(7.3));