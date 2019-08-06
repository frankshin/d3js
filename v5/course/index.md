# d3 v5.x版本实践教程

## Array

### array

- statistics
> 用于计算基本概要信息的方法

d3.min(array[, accessor])

d3.max(array[, accessor])

d3.extent(array[, accessor])

d3.sum(array[, accessor])

d3.mean(array[, accessor])

d3.median(array[, accessor])

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

d3.variance(array[, accessor])

```js
// 下面的demo要使用的几个方法：
d3.json()
d3.hexbin()
```


- search

- transformations

- histograms

### bisector.left()

## axis