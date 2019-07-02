# Daily syntax of d3js

> d3js学习课程

[toc]

## simple demos

> 以demo演示反驱动知识点掌握

- 柱状体

```html
<div id="chart"></div>
```

```css
#chart div {
  display: inline-block;
  background: #4285F4;
  width: 30px;
  margin-right: 3px;
}
```

```js
d3.select('#chart')
  .selectAll("div")
  .data([4, 8, 15, 16, 23, 2])
  .enter()
  .append("div")
  .style("height", (d)=> d + "px")
```

最终生成的html结构如下：
```html
<div id="chart">
  <div style="height: 4px;"></div>
  <div style="height: 8px;"></div>
  <div style="height: 15px;"></div>
  <div style="height: 16px;"></div>
  <div style="height: 23px;"></div>
  <div style="height: 42px;"></div>
</div>
```

- 扩展应用之commit记录

思路：
上一个例子的变量是元素高度，这里的commit记录数据变量是背景颜色，那么查找d3js关于颜色处理的api，发现如下interface：
[interpolateRgb](https://github.com/d3/d3-interpolate/blob/v1.3.2/README.md#interpolateRgb)
[usage for interpolateRgb](https://github.com/d3/d3-interpolate/tree/v1.3.2)
[souce code for interpolateRgb](https://github.com/d3/d3-interpolate/blob/master/src/rgb.js)

```js
const colorMap = d3.interpolateRgb(
  d3.rgb('#d6e685'),
  d3.rgb('#1e6823')
)
d3.select('#chart')
  .selectAll("div")
  .data([0.2, 0.4, 0, 0, 0.13, 0.92])
  .enter()
  .append("div")
  .style("background-color", (d)=> {
    return d == 0 ? '#eee' : colorMap(d)
  })
```

ps：最后观摩下真实github记录的写法

- 数据驱动生成动态图像

> 这里模拟一个航班动态信息路线的看板，第一步依然是寻找变量

```html
<svg id="chart" width="600" height="500">
  <text class="time" x="300" y="50" text-anchor="middle">6:00</text>
  <text class="origin-text" x="90" y="75" text-anchor="end">MEL</text>
  <text class="dest-text" x="510" y="75" text-anchor="start">SYD</text>
  <circle class="origin-dot" r="5" cx="100" cy="75" />
  <circle class="dest-dot" r="5" cx="500" cy="75" />
  <line class="origin-dest-line" x1="110" y1="75" x2="490" y2="75" />
</svg>
```

```css
svg {
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.1);
}
text {
  dominant-baseline: middle;
  font-family: "Open Sans", sans-serif;
  fill: #333;
}
line {
  stroke-linecap: round;
}
.time {
  font-size: 20px;
}
.origin-dest-line {
  stroke: #79B5A2;
  stroke-width: 4;
}
.origin-text, .dest-text {
  font-size: 14px;
}
.origin-dot, .dest-dot {
  fill: #79B5A2;
}
.flight-dot {
  stroke: #fff;
  stroke-width: 2;
}
.flight-line {
  stroke-width: 2;
}
.flight text {
  font-size: 14px;
}
```

```js
import * as d3 from 'd3'
import moment from 'moment'

var data = [
  { departs: '06:00 am', arrives: '07:25 am', id: 'Jetstar 500' },
  { departs: '06:00 am', arrives: '07:25 am', id: 'Qantas 400' },
  { departs: '06:00 am', arrives: '07:25 am', id: 'Virgin 803' },
  { departs: '06:30 am', arrives: '07:55 am', id: 'Qantas 404' },
  { departs: '06:30 am', arrives: '07:55 am', id: 'Virgin 807' },
  { departs: '06:45 am', arrives: '08:10 am', id: 'Qantas 406' },
  { departs: '06:45 am', arrives: '08:10 am', id: 'Virgin 809' },
  { departs: '06:45 am', arrives: '08:15 am', id: 'Tigerair 206' },
  { departs: '07:00 am', arrives: '08:25 am', id: 'Qantas 408' },
  { departs: '07:00 am', arrives: '08:25 am', id: 'Virgin 811' },
  { departs: '07:15 am', arrives: '08:40 am', id: 'Qantas 410' },
  { departs: '07:15 am', arrives: '08:40 am', id: 'Virgin 813' },
  { departs: '07:30 am', arrives: '08:55 am', id: 'Qantas 412' },
  { departs: '07:30 am', arrives: '08:55 am', id: 'Virgin 815' },
  { departs: '07:35 am', arrives: '09:00 am', id: 'Jetstar 502' },
  { departs: '07:45 am', arrives: '09:10 am', id: 'Qantas 402' },
  { departs: '07:45 am', arrives: '09:10 am', id: 'Virgin 817' },
  { departs: '08:00 am', arrives: '09:25 am', id: 'Qantas 414' },
  { departs: '08:00 am', arrives: '09:25 am', id: 'Virgin 819' },
  { departs: '08:30 am', arrives: '09:55 am', id: 'Qantas 416' },
  { departs: '08:30 am', arrives: '09:55 am', id: 'Virgin 823' },
  { departs: '09:00 am', arrives: '10:25 am', id: 'Qantas 418' },
  { departs: '09:00 am', arrives: '10:25 am', id: 'Virgin 827' },
  { departs: '09:15 am', arrives: '10:40 am', id: 'Jetstar 506' },
  { departs: '09:30 am', arrives: '10:55 am', id: 'Qantas 420' },
  { departs: '10:00 am', arrives: '11:25 am', id: 'Qantas 422' },
  { departs: '10:00 am', arrives: '11:25 am', id: 'Virgin 833' },
  { departs: '10:10 am', arrives: '11:35 am', id: 'Tigerair 224' },
  { departs: '10:15 am', arrives: '11:40 am', id: 'Jetstar 508' },
  { departs: '10:40 am', arrives: '12:05 pm', id: 'Jetstar 510' },
  { departs: '11:00 am', arrives: '12:25 pm', id: 'Qantas 426' },
  { departs: '11:00 am', arrives: '12:25 pm', id: 'Virgin 837' },
  { departs: '11:10 am', arrives: '12:35 pm', id: 'Tigerair 228' },
  { departs: '11:30 am', arrives: '12:55 pm', id: 'Qantas 428' },
  { departs: '12:00 pm', arrives: '01:25 pm', id: 'Qantas 430' },
  { departs: '12:00 pm', arrives: '01:25 pm', id: 'Virgin 841' },
  { departs: '12:30 pm', arrives: '01:55 pm', id: 'Qantas 432' },
  { departs: '12:50 pm', arrives: '02:15 pm', id: 'Jetstar 512' },
  { departs: '01:00 pm', arrives: '02:25 pm', id: 'Qantas 434' },
  { departs: '01:00 pm', arrives: '02:25 pm', id: 'Virgin 845' },
  { departs: '01:50 pm', arrives: '03:15 pm', id: 'Tigerair 242' },
  { departs: '02:00 pm', arrives: '03:25 pm', id: 'Qantas 438' },
  { departs: '02:00 pm', arrives: '03:25 pm', id: 'Virgin 849' },
  { departs: '02:30 pm', arrives: '03:55 pm', id: 'Qantas 440' },
  { departs: '03:00 pm', arrives: '04:25 pm', id: 'Qantas 442' },
  { departs: '03:00 pm', arrives: '04:25 pm', id: 'Virgin 853' },
  { departs: '03:20 pm', arrives: '04:45 pm', id: 'Jetstar 514' },
  { departs: '03:30 pm', arrives: '04:55 pm', id: 'Qantas 444' },
  { departs: '03:30 pm', arrives: '04:55 pm', id: 'Tigerair 252' },
  { departs: '04:00 pm', arrives: '05:25 pm', id: 'Qantas 446' },
  { departs: '04:00 pm', arrives: '05:25 pm', id: 'Virgin 859' },
  { departs: '04:15 pm', arrives: '05:40 pm', id: 'Jetstar 518' },
  { departs: '04:30 pm', arrives: '05:55 pm', id: 'Qantas 450' },
  { departs: '04:30 pm', arrives: '05:55 pm', id: 'Virgin 863' },
  { departs: '04:45 pm', arrives: '06:10 pm', id: 'Tigerair 256' },
  { departs: '04:45 pm', arrives: '06:10 pm', id: 'Virgin 865' },
  { departs: '05:00 pm', arrives: '06:25 pm', id: 'Qantas 452' },
  { departs: '05:00 pm', arrives: '06:25 pm', id: 'Virgin 867' },
  { departs: '05:30 pm', arrives: '06:55 pm', id: 'Qantas 454' },
  { departs: '05:30 pm', arrives: '06:55 pm', id: 'Virgin 871' },
  { departs: '05:45 pm', arrives: '07:10 pm', id: 'Qantas 496' },
  { departs: '06:00 pm', arrives: '07:25 pm', id: 'Qantas 458' },
  { departs: '06:00 pm', arrives: '07:25 pm', id: 'Virgin 875' },
  { departs: '06:05 pm', arrives: '07:30 pm', id: 'Jetstar 520' },
  { departs: '06:25 pm', arrives: '07:50 pm', id: 'Tigerair 264' },
  { departs: '06:30 pm', arrives: '07:55 pm', id: 'Qantas 460' },
  { departs: '06:30 pm', arrives: '07:55 pm', id: 'Virgin 879' },
  { departs: '07:00 pm', arrives: '08:25 pm', id: 'Qantas 462' },
  { departs: '07:00 pm', arrives: '08:25 pm', id: 'Virgin 883' },
  { departs: '07:30 pm', arrives: '08:55 pm', id: 'Qantas 464' },
  { departs: '07:40 pm', arrives: '09:05 pm', id: 'Jetstar 522' },
  { departs: '08:00 pm', arrives: '09:25 pm', id: 'Qantas 490' },
  { departs: '08:00 pm', arrives: '09:25 pm', id: 'Virgin 891' },
  { departs: '08:45 pm', arrives: '10:10 pm', id: 'Jetstar 528' },
  { departs: '09:00 pm', arrives: '10:25 pm', id: 'Virgin 897' },
  { departs: '09:05 pm', arrives: '10:30 pm', id: 'Tigerair 282' }
];
data.forEach((d)=> {
  d.departureDate = moment(d.departs, "hh-mm a").toDate();
  d.arrivalDate = moment(d.arrives, "hh-mm a").toDate();
  d.xScale = d3.time.scale()
    .domain([d.departureDate, d.arrivalDate])
    .range([100, 500])
});

var now = moment(data[0].departs, "hh:mm a");
var end = moment(data[data.length - 1].arrives, "hh:mm a");

var loop = ()=> {
  var time = now.toDate();

  var currentData = data.filter((d)=> {
    return d.departureDate <= time && time <= d.arrivalDate
  });

  render(currentData, time);

  if (now <= end) {
     // Increment 5m and call loop again in 500ms
    now = now.add(5, 'minutes');
    setTimeout(loop, 500);
  }
}

var yPoint = (d, i)=> 100 + i * 25;

var colorMap = {
  'Jetstar': '#FF5716',
  'Qantas': '#EE1C25',
  'Virgin': '#CC0001',
  'Tigerair': '#FBA61C',
};
var colorPoint = (d)=> {
  var name = d.id.split(' ')[0];

  return colorMap[name];
}

var render = (data, time)=> {

  // We can also transition the time between the 5 minute increments
  // so that it displays every minute rather than every five minutes using the tween function
  var inFiveMinutes = moment(time).add(5, 'minutes').toDate();
  var i = d3.interpolate(time, inFiveMinutes);  // 返回一个介于param1和param2之间的默认插值器

  // render the time
  d3.select('.time')
    .transition()  // 开始为当前选择的过渡。转换的行为很像选择，除了操作符动画平滑的随着时间的推移，而不是瞬间完成
    .duration(500)  // 缓冲时间500ms
    .ease('linear')
    .tween("text", ()=> {  // 补间函数是用来内部实现attr和style补间，并可以用来对其它文档内容进行内插。https://github.com/d3/d3/wiki/%E8%BF%87%E6%B8%A1#tween
      return function(t) {
        this.textContent = moment(i(t)).format("hh:mm a");
      };
    });

  // Make a d3 selection and apply our data set
  var flight = d3.select('#chart')
    .selectAll('g.flight')
    .data(data, (d)=> d.id)

  // Enter new nodes for any data point with an id not in the DOM
  var newFlight = flight.enter()
    .append("g")
    .attr('class', 'flight')
    .attr('opacity', 0)

  newFlight.transition()
    .duration(500)
    .attr('opacity', 1)

  newFlight.append("text")
    .attr('class',"flight-id")
    .attr('x', (d)=> d.xScale(time) + 10)
    .attr('y', yPoint)
    .text((d)=> d.id)

  newFlight.append("line")
    .attr('class',"flight-line")
    .attr('x1', '100')
    .attr('x2', (d)=> d.xScale(time))
    .attr('y1', yPoint)
    .attr('y2', yPoint)
    .attr('stroke', colorPoint)

  newFlight.append("circle")
    .attr('class',"flight-dot")
    .attr('r', "5")
    .attr('cx', (d)=> d.xScale(time))
    .attr('cy', yPoint)
    .attr('fill', colorPoint)

  flight.select('.flight-id')
    .transition()
    .duration(500)
    .ease('linear')
    .attr('x', (d)=> d.xScale(time) + 10)
    .attr('y', yPoint)

  // Update existing nodes in selection with id's that are in the data
  // Add a smooth transition between the x and y points.
  flight.select('.flight-dot')
    .transition()
    .duration(500)
    .ease('linear')
    .attr('cx', (d)=> d.xScale(time))
    .attr('cy', yPoint)

  flight.select('.flight-line')
    .transition()
    .duration(500)
    .ease('linear')
    .attr('x2', (d)=> d.xScale(time))
    .attr('y1', yPoint)
    .attr('y2', yPoint)

  // Exit old nodes in selection with id's that are not in the data
  flight.exit()
    .transition()
    .duration(500)
    .attr('opacity', 0)
    .remove()
}

loop();
```

## D3js-apis

Q: 如何查询指定版本对应的apis？

- d3.time.scale()

v3+