const data = {
  BUSINESS: {
    color: '#003f88',
    features: [
      'Benefit Planning',
      'Start-Up Planning',
      'Succession Planning'
    ],
  },
  CASHFLOW: {
    color: '#207eb4',
    features: [
      'Benefit Planning',
      'Start-Up Planning',
      'Succession Planning'
    ],
  },
  INSURANCE: {
    color: '#55a4d1',
    features: [
      'Benefit Planning',
      'Start-Up Planning',
      'Succession Planning'
    ],
  },
  ESTATE: {
    color: '#003f88',
    features: [
      'Benefit Planning',
      'Start-Up Planning',
      'Succession Planning'
    ],
  }, 
  TAX: {
    color: '#207eb4',
    features: [
      'Benefit Planning',
      'Start-Up Planning',
      'Succession Planning'
    ],
  },
  INVESTMENT: {
    color: '#55a4d1',
    features: [
      'Benefit Planning',
      'Start-Up Planning',
      'Succession Planning'
    ],
  }
}

const width = 600, 
    height = 600,
    margin = 40

const radius = Math.min(width, height) / 2 - margin

// set up the svg and g to hold pieces
const svg = d3.select('#sg-pie-chart')
  .append('svg')
    .attr('width', '100%')
    .attr('height', 'auto')
    .attr('viewBox', `0 0 ${width} ${height}`)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const numSlices = 6
const portion = 100 / numSlices 

let pie = d3.pie().value(portion)
let data_ready = pie(Object.entries(data))

const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

svg
  .selectAll('pieSlices')
  .data(data_ready)
  .join('path')
  .attr('id', function(d) {
    return `slice-${d.data[0]}`
  })
  .attr('d', arcGenerator)
  .attr('fill', function(d) { 
    return d.data[1].color 
  })
  .on('mouseover', function(d, i) {
    d3.select(this).classed('active', true)
    d3.select(`#text-${this.id}`).classed('active', true)
  })
  .on('mouseleave', function(d, i) {
    d3.select(this).classed('active', false)
    d3.select(`#text-${this.id}`).classed('active', false)
  })

svg
  .selectAll('text')
  .data(data_ready)
  .join('text')
  .text(function(d) { 
    return d.data[0] 
  })
  .attr('id', function(d) {
    return `text-${d.data[0]}`
  })
  .attr('transform', function(d) { 
    return `translate(${arcGenerator.outerRadius(radius + 80).centroid(d)})` 
  })
  .style('fill', 'white')
  .style('text-anchor', 'middle')
  .style('font-family', '"League Spartan", sans-serif')
  .style('font-weight', 'bold')
  .style('font-size', '26px')
  .style('text-shadow', '2px 2px 1px black')
  .style('letter-spacing', '1px')