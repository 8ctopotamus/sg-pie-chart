const width = 600, 
    height = 600,
    margin = 40

const radius = Math.min(width, height) / 2 - margin

const svg = d3.select('#sg-pie-chart')
  .append('svg')
    .attr('width', '100%')
    .attr('height', 'auto')
    .attr('viewBox', `0 0 ${width} ${height}`)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const numSlices = 6
const portion = 100 / numSlices 

const data = {
  BUSINESS: {
    size: portion,
    color: '#003f88'
  },
  CASHFLOW: {
    size: portion,
    color: '#207eb4'
  },
  INSURANCE: {
    size: portion,
    color: '#55a4d1'
  },
  ESTATE: {
    size: portion,
    color: '#003f88'
  }, 
  TAX: {
    size: portion,
    color: '#207eb4'
  },
  INVESTMENT: {
    size: portion,
    color: '#55a4d1'
  }
}

let pie = d3.pie().value(function(d) { return d[1].size })
let data_ready = pie(Object.entries(data))

const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

svg
  .selectAll('pieSlices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d) { 
    
      return d.data[1].color 
    })
  .attr('stroke', 'black')
  .style('stroke-width', '3px')
  .style('opacity', 0.7)

// the pie text
svg
  .selectAll('text')
  .data(data_ready)
  .join('text')
  .text(function(d) { return d.data[0] })
  .attr('transform', function(d) { 
    return `translate(${arcGenerator.outerRadius(radius + 80).centroid(d)})` 
  })
  .style('fill', 'white')
  .style('font-family', 'sans-serif')
  .style('font-weight', 'bold')
  .style('text-anchor', 'middle')
  .style('font-size', '24px')