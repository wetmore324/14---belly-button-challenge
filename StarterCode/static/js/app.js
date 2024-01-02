// Load the URL into a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Initialize the dashboard when the data is loaded
dataPromise.then(data => {
    let selector = d3.select("#selDataset");

    // Get sample names from the data
    let  sampleNames = data.names;

    // Add sample names to the drop down menu
    sampleNames.forEach(sample => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    })

    //  Set the first sample name as the initial sample displayed on the dashboard
    let initialSample = sampleNames[0];

    // Show information and charts for the initial sample
    buildMetadata(initialSample, data);
    buildCharts(initialSample, data);
});

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});



// Create horizontal bar chart with a drop down menu to display the top 10 OTUs found in that individual.

// Sort the data
let sortedSamples = otu_ids.sort((a, b) => b.otu_ids - a.otu_ids);

// Slice the first 10 objects for plotting
let slicedSamples = sortedSamples.slice(0, 10);
console.log(slicedSamples);

// Reverse the array to accommodate Plotly's defaults
slicedSamples.reverse();

// Trace1 for samples data
let trace1 = {
    x: slicedSamples.map(object => object.sample_values),
    y: slicedSamples.map(object => object.otu_ids),
    text: slicedSamples.map(object => object.otu_labels),
    name: "Samples",
    type: "bar",
    orientation: "h"
};

// Data Array
let data = [trace1];

// Apply a title to the layout
let layout = {
    title: "Top 10 OTUs",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
};

// Render the plot to the div tag id "plot"
Plotly.newPlot("plot", data, layout);