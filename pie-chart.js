const width = 450, 
    height = 450,
    margin = 40

const radius = Math.min(width, height) / 2 - margin

const svg = d3.select('#sg-pie-chart')
  .append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const data = {
  a: 9,
  b: 20,
  c: 30,
  d: 8,
  e: 12,
}

const color = d3.scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

let pie = d3.pie()
  .value(function(d) { return d[1] })
let data_ready = pie(Object.entries(data))

svg
  .selectAll('whatever')
  .data(data_ready)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d) { return color(d.data[1]) })
  .attr('stroke', 'black')
  .style('stroke-width', '2px')
  .style('opacity', 0.7)
