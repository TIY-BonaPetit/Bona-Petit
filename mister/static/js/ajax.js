setInterval(function(){
    $.ajax({
        url: "/api/mister/",
        type: 'get',
        success: function(result){
            $('#tc').text(new Date(result.results[0].time_collected).toLocaleString());
            $('#tmp').text(result.results[0].temperature);
            $('#ecl').text(result.results[0].ec_level);
            console.log("set")
        }
    })
}, 1000);
