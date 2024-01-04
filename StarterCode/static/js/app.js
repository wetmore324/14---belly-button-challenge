// Load the URL into a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to select the dropdown element
let selector = d3.select("#selDataset");

// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {
    var sample_values = data.names;
    console.log(data);

    sample_values.forEach((sample) => {
        selector
        .append('option')
        .text(sample)
        .property('value', sample);
  });

    var sample1 = sample_values[0];
    buildCharts(sample1);
    buildMetadata(sample1);
});

 // Fetch new data each time a row sample is selected
    function optionChanged(newSample){
        buildMetadata(newSample);
        buildCharts(newSample);
};
    function buildMetadata(sample) {
        d3.json(url).then((data) => {
            var metadata = data.metadata;
            var resultsArray = metadata.filter(sampleObject => sampleObject.id == sample);
            var result = resultsArray[0];
            var panel = d3.select('#sample-metadata');
            panel.html("");
            Object.entries(result).forEach(([key, value]) => {
                panel.append("h6").text(`${key}: ${value}`);
            });
        });
    };

    function buildCharts(sample) {
        // Put data into variables and filter
        d3.json('samples.json').then((data) => {
            let samples = data.samples;
            // console.log(samples); // Log the entire 'samples' data

            let resultsArray = samples.filter(sampleObject => sampleObject.id == sample);
            console.log(resultsArray); // Log the filtered results

            // First Entry of Array [0]
            if (resultsArray.length > 0) {
                let result = resultsArray[0];
                // console.log(result); // Log the 'result' object to inspect its contents

                let otu_ids = result.otu_ids;
                // console.log(otu_ids); // Log the "otu_ids" to inspect its contents

                let otu_labels = result.otu_labels.slice(0,10).reverse();
                // console.log(otu_labels); // Log the "otu_labels" to inspect its contents

                let sample_values = result.sample_values.slice(0,10).reverse();
                // console.log(sample_values); // Log the "sample_values" to inspect its contents

                let bubble_labels = result.otu_labels;
                // console.log(bubble_labels); // Log the "bubble_labels" to inspect its contents

                let bubble_values = result.sample_values;
                // console.log(bubble_values); // Log the "bubble_values" to inspect its contents

                let yData = result.otu_ids.slice(0,10);
                // console.log(yData); // Log the "yData" to inspect its contents

                let yLabels = [];
                    yData.forEach(function(sample) {
                        yLabels.push(`OTU${sample}`);
                    });

                let trace1 = {
                    x: sample_values.slice(0,10),
                    y: yLabels.reverse(),
                    text: otu_labels.slice(0,10),
                    name: "Bellybutton Biodiversity",
                    type: "bar",
                    orientation: "h",
                    marker: {
                        color: "blue",
                    }
                };

                let traceData = [trace1];

                // Developing bar chart
                Plotly.newPlot("bar", traceData)
                    let layout = {
                        title: "Bellybutton Biodiversity"
                    };

                // Displaying bar chart    
                Plotly.newPlot("bar", traceData, layout);

                // Develop Bubble Chart
                let bubbleData = [{
                    x: otu_ids,
                    y: bubble_values, 
                    text: otu_labels,
                    mode: 'markers',
                    marker: {
                        size: bubble_values,
                        color: otu_ids,
                        colorscale: "YlGnBu",
                    }
                }];

                let bubbleLayout = {
                    title: "Bacteria Present",
                    xaxis: {title: "OTU ID"},
                    yaxis: {title: "Values"},
                };
                // Displaying Bubble Chart
                Plotly.newPlot("bubble", bubbleData, bubbleLayout)
            };
        });
    };