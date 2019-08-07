# d3 v5.x版本

## Array

> 数组api汇总

### array

d3.min(array[, accessor])
返回数组最小值
```js
const res = d3.min([8, 2, 6, 1])
console.warn('res:', res) // 1
```

d3.max(array[, accessor])
返回数组最大值
```js
const res = d3.max([8, 2, 6, 1])
console.warn('res:', res) // 8
```

d3.extent(array[, accessor])
返回数组中的最小和最大值
```js
const res = d3.extent([8, 2, 6, 1])
console.warn('res:', res) // [1, 8]
```

d3.sum(array[, accessor])
返回数组元素只和
```js
const res = d3.sum([8, 2, 6, 1])
console.warn('res:', res) // 17
```

d3.mean(array[, accessor])
返回数组元素平均值
```js
const res = d3.mean([8, 2, 6, 1])
console.warn('res:', res) // 4.25
```

d3.median(array[, accessor])
返回数组中间值
```js
let res
res = d3.median([8, 2, 1])
console.warn('res:', res) // 2
res = d3.median([8, 2, 6, 1])
console.warn('res:', res) // 4
res = d3.median([8, 2, 6, 3, 1])
console.warn('res:', res) // 3
```

d3.quantile(array, p[, accessor])
```js
var a = [0, 10, 30];
d3.quantile(a, 0); // 0
d3.quantile(a, 0.5); // 10
d3.quantile(a, 1); // 30
d3.quantile(a, 0.25); // 5
d3.quantile(a, 0.75); // 20
d3.quantile(a, 0.1); // 2
```

d3.scan(array[, comparator])
对指定数组执行线性扫描，根据指定的比较器返回最小元素的索引。 如果给定的数组不包含可比较的元素（即比较器在将每个元素与自身进行比较时返回NaN），则返回undefined。 如果未指定比较器，则默认为升序。 例如：
```js
var array = [{foo: 42}, {fo: 91}];
d3.scan(array, function(a, b) { return a.foo - b.foo; }) // 0
d3.scan(array, function(a, b) { return b.foo - a.foo; }) // 1
```

d3.json()
获取json数据，详见演示demo

d3.hexbin()
多边形方案,详见演示demo

- search

- transformations

- histograms

## axis

