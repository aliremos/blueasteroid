import * as THREE from '//unpkg.com/three/build/three.module.js';
// Country coordinates (latitude, longitude)
const countryCoordinates = {
  "United States": { lat: 37.0902, lng: -95.7129 },
  "China": { lat: 35.8617, lng: 104.1954 },
  "India": { lat: 20.5937, lng: 78.9629 },
  "Brazil": { lat: -14.2350, lng: -51.9253 },
  "Australia": { lat: -25.2744, lng: 133.7751 },
  "Canada": { lat: 56.1304, lng: -106.3468 },
  "United Kingdom": { lat: 55.3781, lng: -3.4360 },
  "Germany": { lat: 51.1657, lng: 10.4515 },
  "France": { lat: 46.6034, lng: 1.8883 },
  "Italy": { lat: 41.8719, lng: 12.5674 },
  "Russia": { lat: 61.5240, lng: 105.3188 },
  "Japan": { lat: 36.2048, lng: 138.2529 },
  "South Korea": { lat: 35.9078, lng: 127.7669 },
  "Mexico": { lat: 23.6345, lng: -102.5528 },
  "Argentina": { lat: -38.4161, lng: -63.6167 },
  "South Africa": { lat: -30.5595, lng: 22.9375 },
  "Egypt": { lat: 26.8206, lng: 30.8025 },
  "Turkey": { lat: 38.9637, lng: 35.2433 },
  "Indonesia": { lat: -0.7893, lng: 113.9213 },
  "Saudi Arabia": { lat: 23.8859, lng: 45.0792 },
  "Spain": { lat: 40.4637, lng: -3.7492 },
  "Poland": { lat: 51.9194, lng: 19.1451 },
  "Sweden": { lat: 60.1282, lng: 18.6435 },
  "Norway": { lat: 60.4720, lng: 8.4689 },
  "Finland": { lat: 61.9241, lng: 25.7482 },
  "Pakistan": { lat: 30.3753, lng: 69.3451 },
  "Bangladesh": { lat: 23.6850, lng: 90.3563 },
  "Thailand": { lat: 15.8700, lng: 100.9925 },
  "Vietnam": { lat: 14.0583, lng: 108.2772 },
  "Philippines": { lat: 12.8797, lng: 121.7740 },
  "Malaysia": { lat: 4.2105, lng: 101.9758 },
  "New Zealand": { lat: -40.9006, lng: 174.8860 },
  "Nigeria": { lat: 9.0820, lng: 8.6753 },
  "Kenya": { lat: -1.2864, lng: 36.8172 },
  "Colombia": { lat: 4.5709, lng: -74.2973 },
  "Peru": { lat: -9.1900, lng: -75.0152 },
  "Chile": { lat: -35.6751, lng: -71.5430 },
  "Venezuela": { lat: 6.4238, lng: -66.5897 },
  "Iran": { lat: 32.4279, lng: 53.6880 },
  "Iraq": { lat: 33.2232, lng: 43.6793 },
  "Afghanistan": { lat: 33.9391, lng: 67.7100 },
  "Morocco": { lat: 31.7917, lng: -7.0926 },
  "Ukraine": { lat: 48.3794, lng: 31.1656 },
  "Greece": { lat: 39.0742, lng: 21.8243 },
  "Portugal": { lat: 39.3999, lng: -8.2245 },
  "Netherlands": { lat: 52.1326, lng: 5.2913 },
  "Switzerland": { lat: 46.8182, lng: 8.2275 },
  "Austria": { lat: 47.5162, lng: 14.5501 },
  "Belgium": { lat: 50.8503, lng: 4.3517 },
};

const dropdown = document.getElementById('countryDropdown');
const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd).domain([0, 1e7]);
const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
var polygonInitaltitude=0.01;
var polygonMaxaltitude=0.22;
const leftPanel = document.getElementById('leftpanel');// Add event listener for the close button
const rightPanel = document.getElementById('rightpanel');// Add event listener for the close button
document.getElementById('leftclosePanel').addEventListener('click', () => {leftPanel.style.display = 'none';}); 
document.getElementById('rightclosePanel').addEventListener('click', () => {rightPanel.style.display = 'none';}); 
function display_panels(trueorfalse){
  if(trueorfalse){
            leftPanel.style.display = 'block';
            rightPanel.style.display = 'block';
  }
  else{
    leftPanel.style.display = 'none';
    rightPanel.style.display = 'none';    
  }
}

var curselectedyear="2017";
var curselectedcountry="";
// Function to parse CSV to JSON
function csvToJson(csvString) {
  const rows = csvString.split("\n");
  const headers = rows[0].split(",");
  return rows.slice(1).map(row => {
      const values = row.split(",");
      return headers.reduce((acc, header, index) => {
          acc[header.trim()] = values[index]?.trim();
          return acc;
      }, {});
  });
}

function draw_leafs(filteredData, country, year) {
  const values = filteredData.map(d => d.Value).slice(0, 4); // First 4 values
  const variables = filteredData.map(d => d.Variabe).slice(0, 4); // Variable names

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300']; // Colors for petals
  const angles = [0, 90, 180, 270]; // Leaf positions

  const data = [];

  angles.forEach((angle, i) => {
      const r = values[i];
      const angleRadians = (angle * Math.PI) / 180;

      const theta = [];
      const radius = [];

      for (let t = -Math.PI / 4; t <= Math.PI / 4; t += 0.01) {
          const petalR = r * Math.cos(2 * t);
          const petalTheta = angleRadians + t;
          radius.push(petalR);
          theta.push((petalTheta * 180) / Math.PI);
      }

      theta.push(angle);
      radius.push(0);

      data.push({
          r: radius,
          theta: theta,
          type: 'scatterpolar',
          fill: 'toself',
          name: variables[i].replace("SDG 6.4.1. ", "") +" "+values[i]+" (US$/m3)" || `Leaf ${i + 1}`, // Use variable name or fallback
          hoverinfo: 'r+theta',
          fillcolor: colors[i],
          line: {
            shape: 'spline', 
            smoothing: 1.2,
            color: colors[i],     // Set line color to match fillcolor
            width: 2              // Optional: define line width
          },
          showlegend: true
      });
  });

  const layout = {
      polar: {
          radialaxis: { visible: false, range: [0, Math.max(...values) * 1.5] },
          angularaxis: { visible: false }
      },
      showlegend: true,
      paper_bgcolor: 'rgba(0,0,0,0)', // Makes the background transparent
      plot_bgcolor: 'rgba(0,0,0,0)',   // Makes the plot area transparent
      autosize: true, // Automatically resize to the container
      margin: {
          l: 10, // Reduce left margin
          r: 10, // Reduce right margin
          t: 10, // Reduce top margin
          b: 60  // Add space for title and legend
      },
      legend: {
          x: 0, // Move legend to the left
          y: -0.5, // Position legend below the title
          orientation: 'h' // Horizontal legend layout
      },
      annotations: [
          {
              x: 0.5,
              y: -0.2, // Place the title above the legend
              xref: 'paper',
              yref: 'paper',
              text: `Water Use Efficiency (${year})`,
              showarrow: false,
              font: {
                  size: 14
                  
              }
          }
      ]
  };

  Plotly.newPlot('petalChart', data, layout, { responsive: true });
}



function select_country(){
  drawPetalChart(curselectedyear,curselectedcountry);
  drawsunburstChart(curselectedyear, curselectedcountry);
}

async function drawPetalChart(year, country) {
  const response = await fetch('WaterUseEfficiencyPETALChart.csv');
  const dataText = await response.text();
  const rows = dataText.split('\n').slice(1);
  const filteredData = rows
    .map(row => {
        const fields = row.split(',');
        if (fields.length < 9) { // Adjust based on your CSV structure
            console.warn("Row skipped due to insufficient fields:", row);
            return null; // Skip malformed rows
        }
        const [VariableGroup, Subgroup, Variable, Area, Year, Value, Unit, Symbol, IsAggregate] = fields;
        const parsedRow = {
            Area: Area?.trim(), // Safely access Area
            Year: parseInt(Year?.trim()), // Safely access and parse Year
            Value: parseFloat(Value?.trim()), // Safely access and parse Value
            Variabe:Variable
        };
        return parsedRow;
    })
    .filter(row => {
      if (!row) return false; // Skip null or undefined rows
      const cleanedArea = row.Area?.trim().toLowerCase(); // Normalize Area
      const cleanedCountry = country.trim().toLowerCase(); // Normalize country input
      const cleanedYear = row.Year; // Already parsed as an integer
      const isMatch = cleanedArea == cleanedCountry && cleanedYear == year;
      // console.log(`Checking Row: Area="${row.Area}", Cleaned Area="${cleanedArea}", Country="${cleanedCountry}", Year=${row.Year}, Match: ${isMatch}`);
      return isMatch;
  });
  
  
  if (filteredData.length === 0) {
      console.error("No data found for:",country,year);
      return;
  }
  draw_leafs(filteredData,country,year);
}
// Async function to fetch and process the CSV file
async function drawsunburstChart(year, country) {
  year=parseInt(year);
  fetch('SunBurst.csv') // Ensure this file is accessible in your project
  .then(res => res.text())
  .then(csvText => {
    const sunburst = d3.csvParse(csvText);  
    var Precipitation = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Long-term average annual precipitation in volume" ).map(row => row['Value']);
    var TotalExploitableWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Total exploitable water resources" ).map(row => row['Value']);
    var TotalExploitableSurfaceWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Exploitable: total renewable surface water" ).map(row => row['Value']);
    var TotalExploitableGroundWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Exploitable: regular renewable groundwater" ).map(row => row['Value']);
    var ExploitabeIrregularRenewableSurfaceWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Exploitable: irregular renewable surface water" ).map(row => row['Value']);
    var ExploitabeRegularRenewableSurfaceWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Exploitable: regular renewable surface water" ).map(row => row['Value']);
    var TotalRenewablewatervalue = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Total renewable water resources" ).map(row => row['Value']);
    var TotalOverlapRenewableWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Overlap: between surface water and groundwater" ).map(row => row['Value']);
    var TotalRenewableSurfaceWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Total renewable surface water" ).map(row => row['Value']);
    var TotalRenewableGroundwater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Total renewable groundwater" ).map(row => row['Value']);
    var InternallyproducedGroundwater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Groundwater produced internally" ).map(row => row['Value']);
    var InternalOverlapbetweenSurfaceandGroundwater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Overlap between surface water and groundwater" ).map(row => row['Value']);
    var GroundwaterEnteringtheCountry = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Groundwater: entering the country (total)" ).map(row => row['Value']);
    var SurfaceWaterEnteringtheCountry = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Surface water: entering the country (total)" ).map(row => row['Value']);
    var InternallyProducedSurfaceWater = sunburst.filter(row =>row['Area'].trim() === country && Number(row['Year']) === year && row['Variable'].trim() === "Surface water produced internally" ).map(row => row['Value']);
    console.log("cool",Precipitation,country)
    //------------------------------
    var data = [{
      type: "sunburst",
      labels: ["Water Resources", "Precipitation", "Exploitable Water", "Renewable Water", "Exploitable Surface Water", "Exploitable Groundwater", "Renewable Surface Water", "Renewable Groundwater", "Overlap Between Renewable Surface Water and Groundwater", "Exploitable Regular Surface Water", "Exploitable Irregular Surface Water", "Exploitable Regular Grondwater", "Internally produced Surface Water", "Internally Produced Groundwater", "Overlap between Internally Produced Surface Water and Groundwater", "Surface Water Entering the Country", "Groundwater Entering the Country"],
      parents: ["", "Water Resources", "Water Resources", "Water Resources", "Exploitable Water", "Exploitable Water", "Renewable Water", "Renewable Water", "Renewable Water", "Exploitable Surface Water", "Exploitable Surface Water", "Exploitable Groundwater", "Renewable Surface Water", "Renewable Groundwater", "Overlap Between Renewable Surface Water and Groundwater", "Renewable Surface Water", "Renewable Groundwater"],
      values:  [0, Precipitation[0], TotalExploitableWater[0], TotalRenewablewatervalue[0], TotalExploitableSurfaceWater[0], TotalExploitableGroundWater[0], TotalRenewableSurfaceWater[0], 
                TotalRenewableGroundwater[0], TotalOverlapRenewableWater[0], ExploitabeRegularRenewableSurfaceWater[0], ExploitabeIrregularRenewableSurfaceWater[0], TotalExploitableGroundWater[0], 
                InternallyProducedSurfaceWater[0], InternallyproducedGroundwater[0], InternalOverlapbetweenSurfaceandGroundwater[0], SurfaceWaterEnteringtheCountry[0], GroundwaterEnteringtheCountry[0]
              ],
              outsidetextfont: {size: 10, color: "#377eb8"},
              leaf: {opacity: 0.5},
              marker: {line: {width: 2}},
              textposition: 'inside',
              branchvalues: 'relative'
    }];

    var layout = {
      margin: {l: 0, r: 0, b: 0, t: 0},
      width: 600,
      height: 600,
      sunburstcolorway:["#FF6F61", "#6B5B95", "#88B04B"],
      paper_bgcolor: 'rgba(0,0,0,0)', // Makes the background transparent
      plot_bgcolor: 'rgba(0,0,0,0)'   // Makes the plot area transparent
    };
    
      Plotly.newPlot('subburstchart', data, layout);
  });  

}

const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
fetch('ne_110m_admin_0_countries.geojson')
  .then(res => res.json())
  .then(countries => {
    const maxVal = Math.max(...countries.features.map(getVal));
    colorScale.domain([0, 100]);

    // Load the CSV file for Water Stress data
    fetch('WaterStress2017to2021(1).csv') // Ensure this file is accessible in your project
      .then(res => res.text())
      .then(csvText => {

        const waterStressData = d3.csvParse(csvText);          
        // Create a function to generate the waterStressMap for a given year
        const waterStressMapfunc = (data, year) => {
          const map = {};
          data.forEach(row => {
            if (row.Year === year) {
              map[row.Area] = +row.Value; // Convert Value to a number
            }
          });
          return map;
        };
        // Initially use the latest year (2021)
        let waterStressMap = waterStressMapfunc(waterStressData, curselectedyear);
        const globeContainer = document.getElementById('globeViz');
        // Define the Globe
        const world = new Globe(globeContainer, { animateIn: false })
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
          .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
          .polygonAltitude(polygonInitaltitude)
          .polygonCapColor(feat => {
            const adminName = feat.properties.ADMIN; // Get the country's name
            let waterStress = waterStressMap[adminName] || 0; // Retrieve the water stress value
            if(waterStress>100||waterStress==0){
              //console.log(adminName,waterStress);
            }
            waterStress = Math.min(waterStress, 100);// Cap water stress at 100
            return colorScale(waterStress); // Map water stress value to a color scale
          })
          .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
          .polygonStrokeColor(() => '#111')
          .polygonLabel(({ properties: d }) => {
            return `
              <div id="countryminiview">
                <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
                GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
                Population: <i>${d.POP_EST}</i><br/>
                Water Stress: <i>${waterStressMap[d.ADMIN] || 'N/A'}</i>
              </div>
            `;
          })
          .onPolygonHover(hoverD => {
            if (hoverD != null) {
              curselectedcountry=hoverD.properties.ADMIN;
              setCountryDropdown(curselectedcountry);
              select_country()
              //const generalinfo = document.getElementById('generalinfo');
              //generalinfo.innerHTML = `${hoverD.properties.ADMIN} (${hoverD.properties.ISO_A2})`;
            }

            // Update polygon styles on hover
            world
              .polygonAltitude(d => (d === hoverD ? polygonMaxaltitude : polygonInitaltitude))
          })
          .onPolygonClick(clickedD => {
            display_panels(true)
          })
          .polygonsTransitionDuration(300);


        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.1;
        // Function to update the globe's size
        function resizeGlobe() {
          const { clientWidth, clientHeight } = globeContainer;
          world.renderer().setSize(clientWidth, clientHeight);
          world.camera().aspect = clientWidth / clientHeight;
          world.camera().updateProjectionMatrix();
        }
        window.addEventListener('resize', resizeGlobe);

        // Update water stress map and globe on slider change
        const yearSlider = document.getElementById('yearSlider');
        const yearLabel = document.getElementById('yearLabel');
        resizeGlobe();
        yearSlider.addEventListener('input', () => {
          const selectedYear = yearSlider.value;
          yearLabel.textContent = selectedYear;
          curselectedyear=selectedYear;
          // Update the water stress map for the selected year
          waterStressMap = waterStressMapfunc(waterStressData, selectedYear);

          // Redraw the globe polygons to reflect the updated data
          world.polygonsData(countries.features); // Refresh polygons
          drawPetalChart(curselectedyear, curselectedcountry);
          drawsunburstChart(curselectedyear, curselectedcountry); 
        });
        // Handle country selection
        dropdown.addEventListener('change', () => {
          curselectedcountry= dropdown.value
          if (countryCoordinates[curselectedcountry]) {
            const { lat, lng } = countryCoordinates[curselectedcountry];
            world.pointOfView({ lat, lng, altitude: 2.5 }, 1000); // Adjust altitude for zoom level
            select_country();
            display_panels(true);
          }
        });
      });
  });

  function setCountryDropdown(countryName) {
    const dropdown = document.getElementById('countryDropdown');
    const options = dropdown.options;

    // Loop through options to find a matching country
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === countryName) {
            dropdown.selectedIndex = i;
            return;
        }
    }

    // If no match is found, log a message or handle it as needed
    console.error(`Country "${countryName}" not found in the dropdown.`);
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener('click', () => {
    console.log("clicked")
    overlay.style.display = 'none';
  });
});