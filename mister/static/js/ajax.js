setInterval(function(){
    $.ajax({
        url: "/api/mister/",
        type: 'get',
        success: function(result){
            $('#tc').text(result.results[0].time_collected);
            $('#tmp').text(result.results[0].temperature);
            $('#ecl').text(result.results[0].ec_level);
        }
    })
}, 1000);
