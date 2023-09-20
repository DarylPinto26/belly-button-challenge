function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            let ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            let sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            let labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
            // get only top 10 otu ids for the plot OTU and reversing it. 
            let OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            // get the otu id's to the desired form for the plot
            let OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
            // get the top 10 labels for the plot
            let o_labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${o_labels}`)
            let trace = {
                x: sampleValues,
                y: OTU_id,
                text: o_labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // create data letiable
            let data = [trace];
    
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
        Plotly.newPlot("bar", data, layout);
            // The bubble chart
            let trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            let layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data letiable 
            let data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // create the function to get the necessary data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
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
        d3.json("samples.json").then((data)=> {
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