
// grab the json data
d3.json("/api/mister/")

.get(function(error, json) {

    //error callback
    if (error) return console.warn(error);

    //set svg data as json payload
    var data = json.results;
    console.log(data);

  //----------------------------shared graph variables---------------------//

    //set variables for data ranges and axes
    var format = d3.time.format.iso;
    var date_format = d3.time.format("%I:%M:%S");
    var toolTipDate = d3.time.format("%a %b, %I:%M:%S");
    var tempFn = function(d){ return d.temperature };
    var dateFn = function(d){ return format.parse(d.time_collected)};
    var ecFn = function(d){ return d.ec_level };

    //set variables for graph size and margins
    var width = 800;
    var height = 400;
    var margins = {
      top: 20,
      right: 20,
      bottom: 55,
      left: 50
    };

  //-----------------------------axis variables------------------------//

    //set scale for x axis
    var x = d3.time.scale()
      .range([margins.left, width - margins.right])
      .domain(d3.extent(data, dateFn));

    //set scale for temp graph y axis
    var y = d3.scale.linear()
      .range([height - margins.top, margins.bottom])
      .domain([15, 35]);

    //set scale for ec graph y axis
    var ecY = d3.scale.linear()
      .range([height - margins.top, margins.bottom])
      .domain([0, 1500]);

    //set x-axis scale
    xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(date_format);

    //set y-axis scale for temp graph
    yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    //set y-axis scale for ec graph
    ecYAxis = d3.svg.axis()
      .scale(ecY)
      .orient("left");

  //---------------------------temperature graph---------------------------//

    //create an svg graph!
    var svg = d3.select('#temp-graph').append("svg:svg")
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom);

    //append x-axis
    svg.append("svg:g")
      .attr("transform", "translate(0," + (height - margins.bottom/2.75) + ")")
      .call(xAxis);

    //append y-axis
    svg.append("svg:g")
      .attr("transform", "translate(" + (margins.left) + ")")
      .call(yAxis);

    //append x axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+(width/2)+","+(height+margins.bottom/3)+")")
      .text("Time (Hours/Minutes/Seconds)");

    //append y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temperatue (Celsius)");

    //max temperature range line
    svg.append("svg:line")
      .attr("x1", 50)
      .attr("x2", width-20)
      .attr("y1", 135)
      .attr("y2", 135)
      .style("stroke", "lightgray")
      .attr("opacity", 0.1);

    //max temp range area
    var maxRectangle = svg.append("rect")
      .attr("x", 50)
      .attr("y", 55)
      .attr("width", width-70)
      .attr("height", 80)
      .attr("fill", "pink")
      .attr("opacity", 0.7);

    //min temperature range line
    svg.append("svg:line")
      .attr("x1", 50)
      .attr("x2", width-20)
      .attr("y1", 300)
      .attr("y2", 300)
      .style("stroke", "rgb(189, 189, 189)")
      .attr("opacity", 0.6);

    //min temp range area
    var minRectangle = svg.append("rect")
      .attr("x", 50)
      .attr("y", 300)
      .attr("width", width-70)
      .attr("height", 80)
      .attr("fill", "lightblue")
      .attr("opacity", 0.7);

    // create variable for temp data line
    var line = d3.svg.line()
       .x(function(d){ return x(dateFn(d))})
       .y(function(d){ return y(tempFn(d))})
       .interpolate("linear");


    var refreshTempGraph = setInterval( function(){
      d3.json("/api/mister/")
     .get(function(error, json) {
       //error callback
       if (error) return console.warn(error);
       //set svg data as json payload
       var data = json.results;
    //    //append x-axis
    //    ecg.append("svg:g")
    //      .attr("transform", "translate(0," + (height-margins.bottom/2.75) + ")")
    //      .call(xAxis);

      //append temp data line
      svg.append("svg:path")
        .attr("d", line(data))
        .style("stroke", "limegreen");

      //append temp data as circles
      svg.selectAll("circle").data(data).enter()
        .append("svg:circle")
        .attr("r", 4)
        .attr("cx", function(d){ return x(dateFn(d))})
        .attr("cy", function(d){ return y(tempFn(d))})
        .style("stroke", "limegreen")
        .style("fill", "white")
        .on("mouseover", function(d){//add tooltips to display temp/time data on hover over each data point
            tempTooltip.transition()
            .duration(200)
            .style("opacity", 0.7)
            .style("display", "block")
            tempTooltip.html("<div id='temp-tooltip'><span><b>" + d.temperature + "</b>°C</span><br><span>Taken <b>" + d.time_collected + "</b></span></div>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 78) + "px")
        })
        .on("mouseout", function(d){
          tempTooltip.transition()
          .duration(200)
          .style("opacity", 0)
          .style("display", "none")
        });
      }//end get
    }, 1000);//end timer


    //create empty/invisible div to for as to have DOM attachment for tooltip
    var tempTooltip = d3.select("body")
      .append("div")
      .attr("class", "tempTooltip")
      .style("opacity", 0)
      .style("display", "none")
      .attr("z-index", 1000);

  //-----------------------------ec graph---------------------------------------//

    //create the graph
    var ecg = d3.select("#ec-graph").append("svg:svg")
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom);

    //append x-axis
    ecg.append("svg:g")
      .attr("transform", "translate(0," + (height-margins.bottom/2.75) + ")")
      .call(xAxis);

    //append x axis label
    ecg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+(width/2)+","+(height+margins.bottom/3)+")")
      .text("Time (Seconds)");

    //append y-axis
    ecg.append("svg:g")
      .attr("transform", "translate(" + (margins.left) + ")")
      .call(ecYAxis);

    //append y axis label
    ecg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Electrical Conductivilty (µS/cm)");

    //max ec range line
    ecg.append("svg:line")
      .attr("x1", 50)
      .attr("x2", width-20)
      .attr("y1", 118)
      .attr("y2", 118)
      .style("stroke", "lightgray")
      .attr("opacity", 0.3);

    //max ec range area
    var maxRectangle = ecg.append("rect")
      .attr("x", 50)
      .attr("y", 55)
      .attr("width", width-70)
      .attr("height", 63)
      .attr("fill", "lightgray")
      .attr("opacity", 0.7);

    //min ec range line
    ecg.append("svg:line")
      .attr("x1", 50)
      .attr("x2", width-20)
      .attr("y1", 338)
      .attr("y2", 338)
      .style("stroke", "rgb(189, 189, 189)")
      .attr("opacity", 0.6);

    //min temp range area
    var minRectangle = ecg.append("rect")
      .attr("x", 50)
      .attr("y", 338)
      .attr("width", width-70)
      .attr("height", 43)
      .attr("fill", "lightgray")
      .attr("opacity", 0.7);

    // create variable for ec data line
    var ecLine = d3.svg.line()

     .x(function(d){ return x(dateFn(d))})
     .y(function(d){ return ecY(ecFn(d))})
     .interpolate("linear");

    var refreshECGraph = setInterval( function(){

      d3.json("/api/mister/")
     .get(function(error, json) {
       //error callback
       if (error) return console.warn(error);
       //set svg data as json payload
       var data = json.results;
       //append new x axis
       //append x-axis
       ecg.append("svg:g")
         .attr("transform", "translate(0," + (height-margins.bottom/2.75) + ")")
         .call(xAxis);

      //append ec data line
      ecg.append("svg:path")
       .attr("d", ecLine(data))
       .style("stroke", "limegreen");

     //append ec data as circles
     ecg.selectAll("circle").data(data).enter()
       .append("svg:circle")
       .attr("r", 4)
       .attr("cx", function(d){ return x(dateFn(d))})
       .attr("cy", function(d){ return ecY(ecFn(d))})
       .style("stroke", "limegreen")
       .style("fill", "white")
       .on("mouseover", function(d){//add tooltips to display temp/time data on hover over each data point
           tempTooltip.transition()
           .duration(200)
           .style("opacity", 0.7)
           .style("display", "block")
           tempTooltip.html("<div id='temp-tooltip'><span><b>" + d.pH_level + " </b>µS/cm </span><br><span>Taken <b>" + d.time_collected + "</b></span></div>")
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 78) + "px")
       })
       .on("mouseout", function(d){
         tempTooltip.transition()
         .duration(200)
         .style("opacity", 0)
         .style("display", "none")
       });

     }//end get
   }, 1000);//end timeout

    // refreshECGraph();

});
