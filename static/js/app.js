function getPlot(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then (data =>{
        console.log(data)
        let ids = data.samples[0].otu_ids;
        console.log(ids)
        let sampleValue =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValue)
        let otuTop10 = ( data.samples[0].otu_ids.slice(0, 10)).reverse();
        let otuId = otuTop10.map(d => "OTU " + d);
        console.log(`OTU_IDS: ${otuId}`)
        let labels =  data.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        let trace1 = {
            x: sampleValue,
            y: otuId,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        let data1 = [trace1];

        let layout1 = {
            title: "Top 10 OTUs",
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

    Plotly.newPlot("bar", data1, layout1);


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

        let layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
    
        let data2 = [trace2];
    
    Plotly.newPlot("bubble", data2, layout2); 
        
    });
}  

function demograph(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {

        let metaData = data.metadata;
        console.log(metaData)

        let output = metaData.filter(md => md.id.toString() === id)[0];
        let demographics = d3.select("#sample-metadata");

        demographics.html("");
    
        Object.entries(output).forEach((key) => {   
            demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    getPlot(id);
    demograph(id);
}
    
function init() {
    let dropdown = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=> {
        console.log(data)
    
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        getPlot(data.names[0]);
        demograph(data.names[0]);
    });
}


init();