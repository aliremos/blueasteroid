import * as THREE from '//unpkg.com/three/build/three.module.js';
// Country coordinates (latitude, longitude)
const countryCoordinates = {
    "United States": { lat: 37.0902, lng: -95.7129 },
    "China": { lat: 35.8617, lng: 104.1954 },
    "India": { lat: 20.5937, lng: 78.9629 },
    "Brazil": { lat: -14.2350, lng: -51.9253 },
    "Australia": { lat: -25.2744, lng: 133.7751 },
};
const dropdown = document.getElementById('countryDropdown');
const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd).domain([0, 1e7]);
const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
var polygonInitaltitude=0.01;
var polygonMaxaltitude=0.22;
const leftPanel = document.getElementById('leftpanel');// Add event listener for the close button
document.getElementById('closePanel').addEventListener('click', () => {leftPanel.style.display = 'none';}); 

fetch('https://globe.gl/example/datasets/ne_110m_admin_0_countries.geojson')
  .then(res => res.json())
  .then(countries => {
    const maxVal = Math.max(...countries.features.map(getVal));
    colorScale.domain([0, maxVal]);

    const world = new Globe(document.getElementById('globeViz'), { animateIn: false })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonAltitude(polygonInitaltitude)
      .polygonCapColor(feat => colorScale(getVal(feat)))
      .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
      .polygonStrokeColor(() => '#111')
      .polygonLabel(
        ({ properties: d }) => `
        <div id="countryminiview">
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
          Population: <i>${d.POP_EST}</i>
        </div>  
      `
      )
      .onPolygonHover(hoverD => {
        if(hoverD!=null){
            drawRandomPetalChart();
            const generalinfo = document.getElementById('generalinfo');
            generalinfo.innerHTML = `
            <p><b>Name:</b> ${hoverD.properties.ADMIN}</p>
            <p><b>ISO Code:</b> ${hoverD.properties.ISO_A2}</p>
            <p><b>GDP:</b> ${hoverD.properties.GDP_MD_EST} M$</p>
            <p><b>Population:</b> ${hoverD.properties.POP_EST}</p>
            `;                  
        }
  
        // Update polygon styles on hover
        world
          .polygonAltitude(d => (d === hoverD ? polygonMaxaltitude : polygonInitaltitude))
          .polygonCapColor(d => (d === hoverD ? 'steelblue' : colorScale(getVal(d))));
      })
      .onPolygonClick(clickedD => {
        leftPanel.style.display = 'block';
      })
      .polygonsTransitionDuration(300)

      .hexBinPointWeight('pop')
      .hexAltitude(d => d.sumWeight * 6e-8)
      .hexBinResolution(4)
      .hexTopColor(d => weightColor(d.sumWeight))
      .hexSideColor(d => weightColor(d.sumWeight))
      .hexBinMerge(true)
      .enablePointerInteraction(true) // performance improvement                
      .lineHoverPrecision(0);

    fetch('https://globe.gl/example/datasets/world_population.csv')
      .then(res => res.text())
      .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
      .then(data => world.hexBinPointsData(data));

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.1;

    // Handle country selection
    dropdown.addEventListener('change', () => {
      const selectedCountry = dropdown.value;
      if (countryCoordinates[selectedCountry]) {
        const { lat, lng } = countryCoordinates[selectedCountry];
        world.pointOfView({ lat, lng, altitude: 2.5 }, 1000); // Adjust altitude for zoom level
      }
    });
  });


function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.random() * (max - min) + min);
}
function drawRandomPetalChart() {
    // Number of petals
    const numPetals = 8;

    // Generate random radii for two petal sets
    const radii1 = generateRandomArray(numPetals, 1, 5);
    const radii2 = generateRandomArray(numPetals, 1, 5);

    // Angular positions for petals
    const angles = Array.from({ length: numPetals }, (_, i) => (360 / numPetals) * i);

    // Close the loop for polar scatter data
    const closedRadii1 = radii1.concat(radii1[0]);
    const closedRadii2 = radii2.concat(radii2[0]);
    const closedAngles = angles.concat(angles[0]);

    // Trace for the first set of petals
    const trace1 = {
        r: closedRadii1,
        theta: closedAngles,
        fill: 'toself',
        type: 'scatterpolar',
        fillcolor: 'rgba(100, 200, 255, 0.5)', // Light blue
        line: {
        color: 'rgba(100, 200, 255, 0.8)'
        },
        name: 'Petal Set 1'
    };

    // Trace for the second set of petals
    const trace2 = {
        r: closedRadii2,
        theta: closedAngles,
        fill: 'toself',
        type: 'scatterpolar',
        fillcolor: 'rgba(200, 100, 255, 0.5)', // Light purple
        line: {
        color: 'rgba(200, 100, 255, 0.8)'
        },
        name: 'Petal Set 2'
    };

    // Layout for the petal chart
    const layout = {
        title: 'Dynamic Petal Chart',
        polar: {
        angularaxis: {
            visible: true
        },
        radialaxis: {
            visible: true,
            range: [0, 6] // Adjust the range dynamically
        }
        },
        showlegend: false
    };

    // Combine traces and plot
    const data = [trace1, trace2];
    Plotly.newPlot('petalChart', data, layout);
}


