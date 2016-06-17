// grab the json data
d3.json("/api/mister/").get(function(error, json) {

    //error callback
    if (error) return console.warn(error);

    //set svg data as json payload
    var dataStatic = json.results;
    console.log(dataStatic);

    //----------------------------shared graph variables---------------------//
    //set variables for data ranges and axes
    var format = d3.time.format.iso;
    var date_format = d3.time.format("%I:%M:%S");
    var toolTipDate = d3.time.format("%a %b, %I:%M:%S");

    var tempFn = function(d) {
        return d.temperature
    };
    var dateFn = function(d) {
        return format.parse(d.time_collected)
    };
    var ecFn = function(d) {
        return d.ec_level
    };

    //set variables for graph size and margins
    var width = 800;
    var height = 400;
    var margins = {
        top: 20, right: 20, bottom: 55, left: 50
    };

    //-----------------------------axis variables------------------------//
    //set scale for x axis
    var x = d3.time.scale()
        .range([margins.left, width - margins.right])
        .domain(d3.extent(dataStatic, dateFn));

    //set scale for temp graph y axis
    var yTemp = d3.scale.linear()
        .range([height - margins.top, margins.bottom])
        .domain([15, 35]);

    //set scale for ec graph y axis
    var yEC = d3.scale.linear()
        .range([height - margins.top, margins.bottom])
        .domain([0, 1500]);

    //set x-axis scale
    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(date_format);

    //set y-axis scale for temp graph
    var yAxisTemp = d3.svg.axis()
        .scale(yTemp)
        .orient("left");

    //set y-axis scale for ec graph
    var yAxisEC = d3.svg.axis()
        .scale(yEC)
        .orient("left");

    //---------------------------temperature graph---------------------------//
    //create svg graph
    var tempGraph = window.svg = d3.select('#temp-graph').append("svg:svg")
        .attr("width", width + margins.left + margins.right)
        .attr("height", height + margins.top + margins.bottom);

    var lineTemp = d3.svg.line()
        .x(function(d) {
            return x(dateFn(d))
        })
        .y(function(d) {
            return yTemp(tempFn(d))
        })
        .interpolate("linear");

    //-----------------------------ec graph----------------------------------//
    //create the second graph
    var ecGraph = window.svg = d3.select("#ec-graph").append("svg:svg")
        .attr("width", width + margins.left + margins.right)
        .attr("height", height + margins.top + margins.bottom);

    // create variable for ec data line
    var lineEC = d3.svg.line()
        .x(function(d){ return x(dateFn(d)) })
        .y(function(d){ return yEC(ecFn(d)) })
        .interpolate("linear");

    //-----------------------------tooltip-----------------------------------//
    //create empty/invisible div to for as to have DOM attachment for tooltip
    var tempTooltip = d3.select("body")
        .append("div")
        .attr("class", "tempTooltip")
        .style("opacity", 0)
        .style("display", "none")
        .attr("z-index", 1000);



    var refreshGraphs = setInterval( function() {

        d3.json("/api/mister/")
        .get(function(error, json) {

            //error callback
            if (error) return console.warn(error);

            //set svg data as json payload
            var dataUpdate = json.results;

            var pathTemp = tempGraph.selectAll("lineTemp").data(dataUpdate);

            tempGraph.selectAll("*").remove()

            //max temperature range line
            tempGraph.append("svg:line")
                .attr("x1", 50)
                .attr("x2", width-20)
                .attr("y1", 135)
                .attr("y2", 135)
                .style("stroke", "lightgray")
                .attr("opacity", 0.1);

            //max temp range area
            var maxRectangle = tempGraph.append("rect")
                .attr("x", 50)
                .attr("y", 55)
                .attr("width", width-70)
                .attr("height", 80)
                .attr("fill", "pink")
                .attr("opacity", 0.7);

            //min temperature range line
            tempGraph.append("svg:line")
                .attr("x1", 50)
                .attr("x2", width-20)
                .attr("y1", 300)
                .attr("y2", 300)
                .style("stroke", "rgb(189, 189, 189)")
                .attr("opacity", 0.6);

            //min temp range area
            var minRectangle = tempGraph.append("rect")
                .attr("x", 50)
                .attr("y", 300)
                .attr("width", width-70)
                .attr("height", 80)
                .attr("fill", "lightblue")
                .attr("opacity", 0.7);

            //append x-axis
            tempGraph.append("svg:g")
                .attr("transform", "translate(0," + (height - margins.bottom/2.75) + ")")
                .call(xAxis);

            //append y-axis
            tempGraph.append("svg:g")
                .attr("transform", "translate(" + (margins.left) + ")")
                .call(yAxisTemp);

            //append x axis label
            tempGraph.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "translate("+(width/2)+","+(height+margins.bottom/3)+")")
                .text("TIME (HR:MIN:SEC)");

            //append y axis label
            tempGraph.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .html("TEMPERATURE (°C)");

            //change x domain
            x.domain(d3.extent(dataUpdate, dateFn));

            var pathEC = ecGraph.selectAll("lineEC").data(dataUpdate);

            ecGraph.selectAll("*").remove()

            //max temperature range line
            ecGraph.append("svg:line")
                .attr("x1", 50)
                .attr("x2", width-20)
                .attr("y1", 135)
                .attr("y2", 135)
                .style("stroke", "lightgray")
                .attr("opacity", 0.1);

            //max ec range area
            var maxRectangle = ecGraph.append("rect")
                .attr("x", 50)
                .attr("y", 55)
                .attr("width", width-70)
                .attr("height", 63)
                .attr("fill", "lightgray")
                .attr("opacity", 0.7);

            //min ec range line
            ecGraph.append("svg:line")
                .attr("x1", 50)
                .attr("x2", width-20)
                .attr("y1", 338)
                .attr("y2", 338)
                .style("stroke", "rgb(189, 189, 189)")
                .attr("opacity", 0.6);

            //min temp range area
            var minRectangle = ecGraph.append("rect")
                .attr("x", 50)
                .attr("y", 338)
                .attr("width", width-70)
                .attr("height", 43)
                .attr("fill", "lightgray")
                .attr("opacity", 0.7);

            pathTemp.enter().append("path")
                .attr("d", lineTemp(dataUpdate))
                .attr('class', 'lineTemp')
                .style("stroke", "limegreen");


            pathEC.enter().append("path")
                .attr("d", lineEC(dataUpdate))
                .attr('class', 'ecline')
                .style("stroke", "limegreen");

            // append x-axis
            ecGraph.append("svg:g")
                .attr("transform", "translate(0," + (height-margins.bottom/2.75) + ")")
                .call(xAxis);

            //append y-axis
            ecGraph.append("svg:g")
                .attr("transform", "translate(" + (margins.left) + ")")
                .call(yAxisEC);

            //append x axis label
            ecGraph.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "translate("+(width/2)+","+(height+margins.bottom/3)+")")
                .text("TIME (HR:MIN:SEC)");

            //append y axis label
            ecGraph.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .html("CONDUCTIVITY (µS/cm)");

            var circlesTemp = tempGraph.selectAll("circle").data(dataUpdate)

            circlesTemp.transition()
                .attr("cx", function(d) { return x(dateFn(d)) })
                .attr("cy", function(d){ return y(tempFn(d)) });

            //append temp data as circles
            circlesTemp.enter()
                .append("svg:circle")
                .attr("r", 4)
                .attr("cx", function(d){ return x(dateFn(d)) })
                .attr("cy", function(d){ return yTemp(tempFn(d)) })
                .style("stroke", "limegreen")
                .style("fill", "white")
                //add tooltips to display temp/time data on hover over each data point
                .on("mouseover", function(d) {
                    tempTooltip.transition()
                        .duration(200)
                        .style("opacity", 0.7)
                        .style("display", "block")
                    tempTooltip.html("<div id='temp-tooltip'><span><b>" + d.temperature + "</b>°C</span><br><span>Taken <b>" + d.time_collected + "</b></span></div>")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 78) + "px")
                })
                .on("mouseout", function(d) {
                    tempTooltip.transition()
                        .duration(200)
                        .style("opacity", 0)
                        .style("display", "none")
                });

            var circlesEC = ecGraph.selectAll("circle").data(dataUpdate)

            circlesEC.transition()
                .attr("cx", function(d) { return x(dateFn(d)) })
                .attr("cy", function(d){ return ecY(ecFn(d)) })

            //append ec data as circles
            circlesEC.enter()
                .append("svg:circle")
                .attr("r", 4)
                .attr("cx", function(d){ return x(dateFn(d)) })
                .attr("cy", function(d){ return yEC(ecFn(d)) })
                .style("stroke", "limegreen")
                .style("fill", "white")
                .on("mouseover", function(d){//add tooltips to display temp/time data on hover over each data point
                    tempTooltip.transition()
                        .duration(200)
                        .style("opacity", 0.7)
                        .style("display", "block")
                    tempTooltip.html("<div id='temp-tooltip'><span><b>" + d.ec_level + " </b>µS/cm </span><br><span>Taken <b>" + d.time_collected + "</b></span></div>")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 78) + "px")
                    })
                .on("mouseout", function(d){
                    tempTooltip.transition()
                        .duration(200)
                        .style("opacity", 0)
                        .style("display", "none")
                });

        })//end update get

    }, 1000);//end timer

}); // end setup get
