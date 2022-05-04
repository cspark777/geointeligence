(function($) {
  "use strict"; // Start of use strict

    var svg = null;

    var chart1_title = $("#chart1_title").val();
    
    var legend_data = [
      {
        "label": "Negative",
        "lineWidth": 3,
        "legend_x": 50,
        "legend_y": 15,
        "backgroundColor": window.chartColors.red
      }, {
        "label": "Netural",
        "lineWidth": 3,
        "legend_x": 200,
        "legend_y": 15,
        "backgroundColor": window.chartColors.yellow
      }, {
        "label": "Positive",
        "lineWidth": 3,
        "legend_x": 350,
        "legend_y": 15,
        "backgroundColor": window.chartColors.green
      },

    ];  

    draw_line_chart_legend("chart1_legend", legend_data);
    refresh_line_chart("chart1", 'h');

    function draw_line_chart_legend(legend_chart_div, legend_data){
      // append the svg object to the body of the page
      var legend_width = document.getElementById(legend_chart_div).clientWidth
      var legend_height = document.getElementById(legend_chart_div).clientHeight

      var svg_legend = d3.select("#" + legend_chart_div)
        .append("svg")
        .attr("width", legend_width)
        .attr("height", legend_height)
        .append("g")
        .attr("transform", "translate(0, 0)");

      var legends = svg_legend.append('g')
        .attr('class', 'legends')
        .attr('width', legend_width)
        .attr('height', legend_height)
        .attr('x', 100)
        .attr('y', 0);      

      var legend = legends.selectAll(".legend")
        .data(legend_data)
        .enter().append("g")
        .attr("class", "legend");

      legend.append('rect')
        .attr('x', function(d, i){
            return d.legend_x;
        })
        .attr('y', function(d, i){
            return  d.legend_y;
        })
        .attr('width', 30)
        .attr('height', function(d){
            return d.lineWidth;
        })
        .style('fill', function(d) {
            return d.backgroundColor;
        })

      legend.append('text')
        .attr('x', function(d, i){
            return d.legend_x + 35;
        })
        .attr('y', 20)
        .text(function(d){ return d.label; });
    }

    function draw_line_chart(chart_div, data){
      var chart_width = document.getElementById(chart_div).clientWidth
      var chart_height = document.getElementById(chart_div).clientHeight
      
      var main_chart = d3_timeseries()
                  .addSerie(data,{x:'date',y:'negative'},{interpolate:'monotone',color:"#333"})
                  .addSerie(data,{x:'date',y:'netural'},{interpolate:'monotone',color:"#f33"})
                  .addSerie(data,{x:'date',y:'positive'},{interpolate:'monotone',color:"#3f3"})
                  .width(chart_width)
                  .height(chart_height)
      ;

      main_chart('#' + chart_div);
    }

    function refresh_line_chart(){
      console.log("sss");
    }

    function refresh_line_chart(chart_div, interval_type){
      document.getElementById(chart_div).innerHTML = "";
      var data = Samples.utils.createrandomdata(60,[0,100],0.1, interval_type);
      draw_line_chart(chart_div, data)
    }

    var btns = document.getElementsByClassName("btn-time");
    for (var i=0; i<btns.length; i++){
      btns[i].onclick = function(event){
        var btn_type = event.target.getAttribute('data');
        refresh_line_chart("chart1", btn_type);
      };
    }
      

 
    //==========================================================================


    var topic_name = document.getElementById("topic_name").value;
    var topic_frequency = document.getElementById("topic_frequency").value;

    var topic_n = JSON.parse(topic_name);
    var topic_f = JSON.parse(topic_frequency);

    new Chart(document.getElementById("topic1_chart"), {
      type: 'horizontalBar',
      data: {
        labels: topic_n,
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#ff0000", "#ff8000","#ffff00","#80ff00","#00ff00","#00ff80","#00ffff","#0080ff","#0000ff","#7f00ff"],
            data: topic_f
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });

    new Chart(document.getElementById("topic2_chart"), {
      type: 'horizontalBar',
      data: {
        labels: topic_n,
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#ff0000", "#ff8000","#ffff00","#80ff00","#00ff00","#00ff80","#00ffff","#0080ff","#0000ff","#7f00ff"],
            data: topic_f
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });

    var indicator_data = document.getElementById("indicator_data").value;
    var indicator_array = JSON.parse(indicator_data);
    var indicator0 = new JustGage({
        id: "indicator0", // the id of the html element
        value: indicator_array[0],
        min: 0,
        max: 100,
        decimals: 2,
        gaugeWidthScale: 0.6,
        pointer: true,
        symbol: ' %',
        pointerOptions: {
          toplength: null,
          bottomlength: null,
          bottomwidth: null,
          stroke: 'none',
          stroke_width: 0,
          stroke_linecap: 'square',
          color: '#000000'
        }
    });

    var indicator1 = new JustGage({
        id: "indicator1", // the id of the html element
        value: indicator_array[1],
        min: 0,
        max: 100,
        decimals: 2,
        gaugeWidthScale: 0.6,
        pointer: true,
        symbol: ' %',
        pointerOptions: {
          toplength: null,
          bottomlength: null,
          bottomwidth: null,
          stroke: 'none',
          stroke_width: 0,
          stroke_linecap: 'square',
          color: '#000000'
        }
    });

    var indicator2 = new JustGage({
        id: "indicator2", // the id of the html element
        value: indicator_array[2],
        min: 0,
        max: 100,
        decimals: 2,
        gaugeWidthScale: 0.6,
        pointer: true,
        symbol: ' %',
        pointerOptions: {
          toplength: null,
          bottomlength: null,
          bottomwidth: null,
          stroke: 'none',
          stroke_width: 0,
          stroke_linecap: 'square',
          color: '#000000'
        }
    });

    $('.select-2').select2({
      
    });

    //=========================== Export section ============================

    function export_data(export_type){
      document.getElementById("export_type").value = export_type;
      document.getElementById("export_form").submit();
    }

    document.getElementById("export_twitter").onclick = function(){
      export_data('tweets');
    }
    document.getElementById("export_topic").onclick = function(){
      export_data('topics');
    }

 
})(jQuery); // End of use strict