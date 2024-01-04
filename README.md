# 14-belly-button-challenge

In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

In this Bellybutton Dashboard a drop down menu was created for all of the otu ids in the study.  When an otu id was selected it displayed in the bar chart the top 10 otu's for each sample.  Also it showed on the bubble chart how much of which bacteria was displayed with each sample.  Upon hovering over the bubble chart you will see the types of bateria involved in the sample.

With this project I received help from Mark a tutor on how to better use arrow functions in the code.
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

Also received help cbarnard through AskBCS on how to properly console log to see if the desired results were achieved.
             let samples = data.samples;
            // console.log(samples); // Log the entire 'samples' data

            let resultsArray = samples.filter(sampleObject => sampleObject.id == sample);
            console.log(resultsArray); // Log the filtered results
