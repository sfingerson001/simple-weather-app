$(function() {
    
    // add button
   $('#form').append('<button id="fetch">Fetch Weather</button>');
    
    // convert temp
    convertKtoF = function(K){
        return Math.round(((K - 273.15) * 1.8) + 32)
    }
    
    //validate zipcode
    validateZIP = function(zip){
        //check that it's 5 digits
        if (zip.length !== 5){
            return false;
        }
        //check that it's numeric
        if (isNaN(Number(zip))){
            return false;
        }
        return true;
    }
    
   $('#fetch').on('click',function(){
       var zipcode = $('#zip').val();
       var apiKey = $('#apikey input').val();
       var zipCheck = validateZIP(zipcode);
       
       if (zipCheck) {
           var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&appid='+apiKey;

           $.getJSON(url).done(function(data){
               
                   var location = data.name;
                   var temp = convertKtoF(data.main.temp);
                   var desc = data.weather[0].description;

                   $('#weather').html(
                    '<h3><strong>Current City: </strong>'+location+'</h3>'+
                    '<p><strong>Current Temperature: </strong>'+temp+'&#8457;</p>'+
                    '<p><strong>Current Weather: </strong>'+desc+'</p>'
                   );

           }).fail(function(e) {
                  $('#weather').html(
                '<h3>Oops! Something went wrong...</h3>'+
                '<p>Code: '+e.responseJSON.cod+'</p>'+
                '<p>Message: '+e.responseJSON.message+'</p>'
               );
           });
           
       } else {
           $('#weather').html(
                '<h3><strong>Bad Zipcode: </strong>Please enter only 5 digit zipcodes and try again.</h3>'
           );
       }
       
   })
    
});