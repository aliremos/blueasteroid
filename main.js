const countries = [
    'AFG', 'ALB', 'DZA', 'AND', 'AGO', 'ATG', 'ARG', 'ARM', 'AUS', 'AUT', 'AZE',
    'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BTN', 'BOL', 'BIH',
    'BWA', 'BRA', 'BRN', 'BGR', 'BFA', 'BDI', 'CPV', 'KHM', 'CMR', 'CAN', 'CAF',
    'TCD', 'CHL', 'CHN', 'COL', 'COM', 'COG', 'CRI', 'CIV', 'HRV', 'CUB', 'CYP',
    'CZE', 'COD', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI',
    'EST', 'SWZ', 'ETH', 'FJI', 'FIN', 'FRA', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA',
    'GRC', 'GRD', 'GTM', 'GIN', 'GNB', 'GUY', 'HTI', 'HND', 'HUN', 'ISL', 'IND',
    'IDN', 'IRN', 'IRQ', 'IRL', 'ISR', 'ITA', 'JAM', 'JPN', 'JOR', 'KAZ', 'KEN',
    'KIR', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE',
    'LTU', 'LUX', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MRT', 'MUS',
    'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU',
    'NPL', 'NLD', 'NZL', 'NIC', 'NER', 'NGA', 'MKD', 'NOR', 'OMN', 'PAK', 'PLW',
    'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'POL', 'PRT', 'QAT', 'ROU', 'RUS', 'RWA',
    'KNA', 'LCA', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE',
    'SGP', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR',
    'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TON', 'TTO',
    'TUN', 'TUR', 'TKM', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'URY', 'UZB',
    'VUT', 'VEN', 'VNM', 'YEM', 'ZMB', 'ZWE'
];
const countryNames = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina',
    'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
    'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
    'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde',
    'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba',
    'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
    'Kenya', 'Kiribati', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
    'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
    'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
    'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
    'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
    'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela',
    'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];
const areaToCountry = {
    'Afghanistan': ['AFG'],
    'Albania': ['ALB'],
    'Algeria': ['DZA'],
    'Angola': ['AGO'],
    'Antigua and Barbuda': ['ATG'],
    'Argentina': ['ARG'],
    'Armenia': ['ARM'],
    'Australia': ['AUS'],
    'Australia and New Zealand': [],
    'Austria': ['AUT'],
    'Azerbaijan': ['AZE'],
    'Bahrain': ['BHR'],
    'Bangladesh': ['BGD'],
    'Barbados': ['BRB'],
    'Belarus': ['BLR'],
    'Belgium': ['BEL'],
    'Belize': ['BLZ'],
    'Benin': ['BEN'],
    'Bhutan': ['BTN'],
    'Bolivia (Plurinational State of)': [],
    'Bosnia and Herzegovina': ['BIH'],
    'Botswana': ['BWA'],
    'Brazil': ['BRA'],
    'Brunei Darussalam': ['BRN'],
    'Bulgaria': ['BGR'],
    'Burkina Faso': ['BFA'],
    'Burundi': ['BDI'],
    'Cabo Verde': ['CPV'],
    'Cambodia': ['KHM'],
    'Cameroon': ['CMR'],
    'Canada': ['CAN'],
    'Central African Republic': ['CAF'],
    'Central Asia': [],
    'Central and Southern Asia': [],
    'Chad': ['TCD'],
    'Chile': ['CHL'],
    'China': ['CHN'],
    'Colombia': ['COL'],
    'Comoros': ['COM'],
    'Congo': ['COG'],
    'Costa Rica': ['CRI'],
    'Croatia': ['HRV'],
    'Cuba': ['CUB'],
    'Cyprus': ['CYP'],
    'Czechia': ['CZE'],
    "Côte d'Ivoire": ['CIV'],
    "Democratic People's Republic of Korea": ['PRK'],
    'Democratic Republic of the Congo': [],
    'Denmark': ['DNK'],
    'Djibouti': ['DJI'],
    'Dominica': ['DMA'],
    'Dominican Republic': ['DOM'],
    'Eastern Asia': [],
    'Eastern and South-Eastern Asia': [],
    'Ecuador': ['ECU'],
    'Egypt': ['EGY'],
    'El Salvador': ['SLV'],
    'Equatorial Guinea': ['GNQ'],
    'Eritrea': ['ERI'],
    'Estonia': ['EST'],
    'Eswatini': ['SWZ'],
    'Ethiopia': ['ETH'],
    'Europe': [],
    'Europe and Northern America': [],
    'Fiji': ['FJI'],
    'Finland': ['FIN'],
    'France': ['FRA'],
    'Gabon': ['GAB'],
    'Gambia': ['GMB'],
    'Georgia': ['GEO'],
    'Germany': ['DEU'],
    'Ghana': ['GHA'],
    'Greece': ['GRC'],
    'Grenada': ['GRD'],
    'Guatemala': ['GTM'],
    'Guinea': ['GIN'],
    'Guinea-Bissau': ['GNB'],
    'Guyana': ['GUY'],
    'Haiti': ['HTI'],
    'Honduras': ['HND'],
    'Hungary': ['HUN'],
    'Iceland': ['ISL'],
    'India': ['IND'],
    'Indonesia': ['IDN'],
    'Iran (Islamic Republic of)': [],
    'Iraq': ['IRQ'],
    'Ireland': ['IRL'],
    'Israel': ['ISR'],
    'Italy': ['ITA'],
    'Jamaica': ['JAM'],
    'Japan': ['JPN'],
    'Jordan': ['JOR'],
    'Kazakhstan': ['KAZ'],
    'Kenya': ['KEN'],
    'Kuwait': ['KWT'],
    'Kyrgyzstan': ['KGZ'],
    'Land Locked Developing Countries': [],
    "Lao People's Democratic Republic": ['LAO'],
    'Latin America and the Caribbean': [],
    'Latvia': ['LVA'],
    'Least Developed Countries': [],
    'Lebanon': ['LBN'],
    'Lesotho': ['LSO'],
    'Liberia': ['LBR'],
    'Libya': ['LBY'],
    'Lithuania': ['LTU'],
    'Luxembourg': ['LUX'],
    'Madagascar': ['MDG'],
    'Malawi': ['MWI'],
    'Malaysia': ['MYS'],
    'Maldives': ['MDV'],
    'Mali': ['MLI'],
    'Malta': ['MLT'],
    'Mauritania': ['MRT'],
    'Mauritius': ['MUS'],
    'Mexico': ['MEX'],
    'Mongolia': ['MNG'],
    'Morocco': ['MAR'],
    'Mozambique': ['MOZ'],
    'Myanmar': ['MMR'],
    'Namibia': ['NAM'],
    'Nepal': ['NPL'],
    'Netherlands (Kingdom of the)': [],
    'New Zealand': ['NZL'],
    'Nicaragua': ['NIC'],
    'Niger': ['NER'],
    'Nigeria': ['NGA'],
    'North Macedonia': ['MKD'],
    'Northern Africa': [],
    'Northern Africa and Western Asia': [],
    'Northern America': [],
    'Norway': ['NOR'],
    'Oceania': [],
    'Oceania (excluding Australia and New Zealand)': [],
    'Oman': ['OMN'],
    'Pakistan': ['PAK'],
    'Palestine': [],
    'Panama': ['PAN'],
    'Papua New Guinea': ['PNG'],
    'Paraguay': ['PRY'],
    'Peru': ['PER'],
    'Philippines': ['PHL'],
    'Poland': ['POL'],
    'Portugal': ['PRT'],
    'Puerto Rico': ['PRI'],
    'Qatar': ['QAT'],
    'Republic of Korea': [],
    'Republic of Moldova': ['MDA'],
    'Romania': ['ROU'],
    'Russian Federation': ['RUS'],
    'Rwanda': ['RWA'],
    'Saint Kitts and Nevis': ['KNA'],
    'Saint Lucia': ['LCA'],
    'Saint Vincent and the Grenadines': ['VCT'],
    'Sao Tome and Principe': ['STP'],
    'Saudi Arabia': ['SAU'],
    'Senegal': ['SEN'],
    'Serbia': ['SRB'],
    'Sierra Leone': ['SLE'],
    'Singapore': ['SGP'],
    'Slovakia': ['SVK'],
    'Slovenia': ['SVN'],
    'Small Island Developing States': [],
    'Somalia': ['SOM'],
    'South Africa': ['ZAF'],
    'South Sudan': ['SSD'],
    'South-eastern Asia': [],
    'Southern Asia': [],
    'Spain': ['ESP'],
    'Sri Lanka': ['LKA'],
    'Sub-Saharan Africa': [],
    'Sudan': ['SDN'],
    'Suriname': ['SUR'],
    'Sweden': ['SWE'],
    'Switzerland': ['CHE'],
    'Syrian Arab Republic': ['SYR'],
    'Tajikistan': ['TJK'],
    'Thailand': ['THA'],
    'Timor-Leste': ['TLS'],
    'Togo': ['TGO'],
    'Trinidad and Tobago': ['TTO'],
    'Tunisia': ['TUN'],
    'Turkmenistan': ['TKM'],
    'Türkiye': [],
    'Uganda': ['UGA'],
    'Ukraine': ['UKR'],
    'United Arab Emirates': ['ARE'],
    'United Kingdom of Great Britain and Northern Ireland': ['GBR'],
    'United Republic of Tanzania': ['TZA'],
    'United States of America': ['USA'],
    'Uruguay': ['URY'],
    'Uzbekistan': ['UZB'],
    'Venezuela (Bolivarian Republic of)': [],
    'Viet Nam': ['VNM'],
    'Western Asia': [],
    'World': [],
    'Yemen': ['YEM'],
    'Zambia': ['ZMB'],
    'Zimbabwe': ['ZWE']
};

const zValues = Array(countries.length).fill(0); // Base color values for countries
// Load CSV file
d3.csv('WaterStress__World_2017-2021.csv').then((data) => {
    const { formattedData, minVal, maxVal } = processCSVData(data);
    console.log(maxVal)
    initializeChoropleth(minVal, maxVal);
    initializeSlider(formattedData, minVal, maxVal);    
});
// Function to process CSV data
function processCSVData(data) {
    const formattedData = {};
    let minVal = Infinity;
    let maxVal = -Infinity;    
    // Structure data by year
    data.forEach(row => {
        
        const year = row['Year'];
        const country = row['Area'];
        const value = parseFloat(row['Value']); // Ensure it's a number
        if (!formattedData[year]) {
            formattedData[year] = {};
        }
        formattedData[year][country] = value || 0; // Default to 0 if value is missing
        // Update min and max values
        if (value) {
            minVal = Math.min(minVal, value);
            maxVal = Math.max(maxVal, value);
        }        
    });
    return { formattedData, minVal, maxVal };
}

// Hover event listener to highlight countries and show "detailsdiv"
const globeElement = document.getElementById('globe');
const detailsDiv = document.getElementById('detailsdiv');
const detailstitle = document.getElementById('detailstitle');


// Adjust globe size dynamically
window.addEventListener("resize", () => {
    const globeElement = document.getElementById('globe');
    globeElement.style.width = window.innerWidth + 'px';
    globeElement.style.height = window.innerHeight + 'px';    
    Plotly.relayout('globe', {
        width: window.innerWidth,
        height: window.innerHeight
    });

});
function initializeChoropleth(zmin, zmax) {
    var data = [{
        type: 'choropleth',
        locationmode: 'ISO-3',
        locations: countries,
        z: zValues, // Initial zValues, can be updated later
        text: countryNames,
        hovertemplate: '%{text}', // Show country name on hover
        colorscale: 'YlOrRd', // Choose a predefined colorscale (or define a custom one)
        marker: {
            line: {
                color: 'black',
                width: 0.5
            }
        },
        zmin: zmin, // Set the minimum value dynamically
        zmax: zmax  // Set the maximum value dynamically
    }];

    // Layout for the globe
    const layout = {
        geo: {
            projection: {
                type: 'orthographic',
                rotation: {
                    lon: 0,
                    lat: 0,
                    roll: 0
                }
            },
            showland: true,
            landcolor: 'rgb(243, 243, 243)',
            showocean: true,
            showcountries: true,
            oceancolor: 'rgb(145, 222, 255)'
        },
        margin: { l: 0, r: 0, t: 0, b: 0 }
    };

    Plotly.newPlot('globe', data, layout, { responsive: true }).then(() => {
        globeElement.on('plotly_hover', function(eventData) {
            drawRandomPetalChart();
            const countryCode = eventData.points[0].location; // Get the ISO-3 code of the hovered country
            const countryIndex = countries.indexOf(countryCode);
            if (countryIndex !== -1) {
                // Highlight the hovered country by setting its z value to 6000
                const newZValues = [...zValues];
                newZValues[countryIndex] = 6000;
                
                Plotly.update('globe', { z: [newZValues] }, {}, 0);
    
                // Show detailsDiv
                detailsDiv.style.display = 'block';
                detailstitle.innerText = `Country: ${countryNames[countryIndex]}`;
            }
        });
    
        globeElement.on('plotly_unhover', function(eventData) {
            const countryCode = eventData.points[0].location; // Get the ISO-3 code of the hovered country
            const countryIndex = countries.indexOf(countryCode);
            if (countryIndex !== -1) {
                // Reset the z value to its original state
                const resetZValues = [...zValues];
                resetZValues[countryIndex] = zValues[countryIndex];
                
                Plotly.update('globe', { z: [resetZValues] }, {}, 0);
            }
    
            // Hide detailsDiv
            detailsDiv.style.display = 'none';
        });
    });
    
}

function initializeSlider(data) {
    const slider = document.getElementById('yearSlider');
    const yearLabel = document.getElementById('yearLabel');

    // Initial render for the starting year
    updateGlobe(data, slider.value);

    // Update globe when the slider value changes
    slider.addEventListener('input', () => {
        const selectedYear = slider.value;
        yearLabel.innerText = selectedYear; // Update the label
        updateGlobe(data, selectedYear);
    });
}
function mapAreaToCountry(area, areaToCountry) {
    return areaToCountry[area] || []; // Return an empty array if the Area is not mapped
}
function updateGlobe(data, year) {
    const yearData = data[year];
    if (!yearData) {
        console.error(`No data for year ${year}`);
        return;
    }

    const newZValues = countries.map(countryCode => {
        let value = 0;

        // Check each Area in yearData
        for (const [area, areaValue] of Object.entries(yearData)) {
            const mappedCountries = mapAreaToCountry(area, areaToCountry); // Map Area to ISO-3 codes
            if (mappedCountries.includes(countryCode)) {
                value += parseFloat(areaValue) || 0; // Aggregate values if multiple matches
            }
        }
        
        return value; // Default to 0 if no match
    });


    // Update the globe visualization
    Plotly.update('globe', { z: [newZValues] }, {}, 0);
}


window.addEventListener("resize", () => {
    const globeElement = document.getElementById('globe');
    Plotly.relayout('globe', {
        width: window.innerWidth,
        height: window.innerHeight - 100 // Account for slider space
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