function getPlots(id) {
    //Read samples.json
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then (data =>{
        console.log(data)
        let ids = data.samples[0].otu_ids;
        console.log(ids)
        let sampleValues =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        // get only top 10 otu ids for the plot OTU and reversing it. 
        let OTU_top = ( data.samples[0].otu_ids.slice(0, 10)).reverse();
        // get the otu id's to the desired form for the plot
        let OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU_IDS: ${OTU_id}`)
         // get the top 10 labels for the plot
        let labels =  data.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        let trace1 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
            // create data letiable
        let data1 = [trace1];
    
            // create layout letiable to set plots layout
        let layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
    
            // create the bar plot
    Plotly.newPlot("bar", data1, layout);
            // The bubble chart
        let trace2 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text:  data.samples[0].otu_labels
    
        };
    
            // set the layout for the bubble plot
        let layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
    
            // creating data letiable 
        let data2 = [trace2];
    
        // create the bubble plot
    Plotly.newPlot("bubble", data2, layout_2); 
        
    });
}  
    // create the function to get the necessary data
function getDemoInfo(id) {
    // read the json file to get data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
    // get the metadata info for the demographic panel
        let metadata = data.metadata;
    
        console.log(metadata)
    
          // filter meta data info by id
        let result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
        let demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
    // create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}
    
    // create the function for the initial data rendering
function init() {
        // select dropdown menu 
    let dropdown = d3.select("#selDataset");
    
        // read the data 
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        console.log(data)
    
            // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
    
            // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}
    
init();