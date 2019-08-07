import * as d3 from 'd3'
import moment from 'moment'
// import array from 'd3-array'
// require('d3-array')
// require('d3-axis')

let res
res = d3.median([8, 2, 1])
console.warn('res:', res) // 4.25
res = d3.median([8, 2, 6, 1])
console.warn('res:', res) // 4.25
res = d3.median([8, 2, 6, 3, 1])
console.warn('res:', res) // 4

// const res = d3.median([8,2,3])
// console.warn('res:', res)

// var axis = d3.axisLeft(scale)
// d3.select("body").append("svg")
//     .attr("width", 1440)
//     .attr("height", 30)
//   .append("g")
//     .attr("transform", "translate(0,30)")
//     .call(axis);


// var array = [{foo: 42}, {fo0: 91}];
// const val1 = d3.scan(array, function(a, b) { return a.foo - b.foo });
// const val2 = d3.scan(array, function(a, b) { return b.foo - a.foo });
// console.warn(val1, val2)