const { geoMercator, geoPath } = require('d3-geo');
const aceh = require('./src/lib/data/acehAdm2').default;
const projection = geoMercator().fitSize([760,520], aceh);
const generator = geoPath(projection);
let count = 0;
aceh.features.forEach(feature => {
  const d = generator(feature);
  if (!d || d.length === 0) {
    console.log('missing path for', feature.properties.shapeName, feature.geometry.type);
    count++;
  }
});
console.log('done', count, 'missing');
