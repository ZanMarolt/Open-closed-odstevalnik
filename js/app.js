$(document).ready(function () {
    
    var DAN = Boolean;

    //dnevi in odpiralni casi
    var dnevi  = [
        nedelja = {
            dan         : 'nedelja',
            zacetekUra  : '23',
            zacetekMin  : '51',
            konecUra    : '23',
            konecMin    : '52'
        },

        ponedeljek = {
            dan         : 'ponedeljek',
            zacetekUra  : '8',
            zacetekMin  : '00',
            konecUra    : '23',
            konecMin    : '00'
        },
        torek = {
            dan         : 'torek',
            zacetekUra  : '8',
            zacetekMin  : '00',
            konecUra    : '23',
            konecMin    : '00'
        },
        sreda = {
            dan         : 'sreda',
            zacetekUra  : '8',
            zacetekMin  : '00',
            konecUra    : '23',
            konecMin    : '00'
        },
        cetrtek = {
            dan         : 'cetrtek',
            zacetekUra  : '8',
            zacetekMin  : '00',
            konecUra    : '23',
            konecMin    : '00'
        },
        petek = {
            dan         : 'petek',
            zacetekUra  : '8',
            zacetekMin  : '00',
            konecUra    : '23',
            konecMin    : '00'
        },
        sobota = {
            dan         : 'sobota',
            zacetekUra  : '8',
            zacetekMin  : '00',
            konecUra    : '23',
            konecMin    : '00'
        }
    ];
    
    // Get PHP timestamp and saving it as a variable as beginning of time also converting from miliseconds to seconds
    var dayBeginningTimestamp   = $('#PHPDate').text()*1000;
    var currentTimestamp        = $('#PHPDate').text()*1000;
    var incrementedTimestamp    = $('#PHPDate').text()*1000;
    var startTimestamp          = $('#PHPDate').text()*1000;
    var nextDayStartTimestamp   = $('#PHPDate').text()*1000;
    var endTimestamp            = $('#PHPDate').text()*1000;
    var deadline                = $('#PHPDate').text()*1000;
    
    // Start the seconds rolling
    function initiateSeconds(){
        incrementedTimestamp = incrementedTimestamp+1000;
        checkRestaurant();
    }
    
    // Keep incrementing seconds every second
    var secondsInterval = setInterval(initiateSeconds,1000);
    
    // Calculate beginning timestamp
    function calculateBeginningTimestamp(){
        
        // Get minutes and seconds and substract them to get the endDay timestamp
        var todaysDaySeconds = new Date(currentTimestamp).getSeconds()*1000;
        var todaysDayMinutes = new Date(currentTimestamp).getMinutes()*1000*60;
        var todaysDayHours = new Date(currentTimestamp).getHours()*1000*60*60;

        // Calculate Today's day beginning timestamp
        dayBeginningTimestamp = currentTimestamp-todaysDaySeconds-todaysDayMinutes-todaysDayHours;
    }
    
    calculateBeginningTimestamp();
    
    // Calculate startTimestamp
    function calculateStartTimestamp() {

        
        // Check if the day needs changing
        if(DAN){
            var day = new Date(currentTimestamp).getDay();
        }else{
            var day = new Date(currentTimestamp).getDay()+1;
        }
        
        // Calculate Today's start Timestamp
        var startDayMinutes = dnevi[day].zacetekMin*1000*60;
        var startDayHours = dnevi[day].zacetekUra*1000*60*60;

        startTimestamp = dayBeginningTimestamp+startDayMinutes+startDayHours;

        // just a comment for me to copy
        // console.log('Secs: '+todaysDaySeconds+' Mins: '+todaysDayMinutes+' Hrs: '+todaysDayHours);
        
    }
    
    calculateStartTimestamp();
    
    // Calculate endTimestamp
    function calculateEndTimestamp() {

        // Check if the day needs changing
        if(DAN){
            var day = new Date(currentTimestamp).getDay();
        }else{
            var day = new Date(currentTimestamp).getDay()+1;
        }
        
        // Calculate Today's end Timestamp
        var endDayMinutes = dnevi[day].konecMin*1000*60;
        var endDayHours = dnevi[day].konecUra*1000*60*60;

        endTimestamp = dayBeginningTimestamp+endDayMinutes+endDayHours;
        
    }
    
    calculateEndTimestamp();

    // Check Restaurant time till Open
    function checkRestaurant(){
        
        if(incrementedTimestamp <= startTimestamp){
            
            DAN = true;
            text = 'Zaprto';
            updateCountdown(incrementedTimestamp, startTimestamp);
            
        }else if (incrementedTimestamp >= endTimestamp){
            
            DAN = false;
            text = 'Zaprto';
            
            // Changing Date to tomorrow
            dayBeginningTimestamp = dayBeginningTimestamp+1000*60*60*24;
            
            // Updating start and end timestamps to tomorrow's
            calculateStartTimestamp();
            calculateEndTimestamp()
            
            updateCountdown(incrementedTimestamp, startTimestamp);
            
        }else{
            
            DAN = true;
            text = 'Odprto';
            updateCountdown(incrementedTimestamp, endTimestamp);

        }
        
    }
    
    checkRestaurant();
    
    // Update Countdown if neccessary
    function updateCountdown(currentTime, deadline){
        
        var countdown = deadline - currentTime;
        
        updateHTML(countdown, text);
        
    }
    
    // Bind countdown to HTML
    
    function updateHTML(countdown, text){
        
        var seconds = Math.floor( (countdown/1000) % 60 );
        var minutes = Math.floor( (countdown/1000/60) % 60 );
        var hours = Math.floor( (countdown/(1000*60*60)) % 24 );
        var days = Math.floor( countdown/(1000*60*60*24) );  
        
        $('.seconds').text(seconds);
        $('.minutes').text(minutes);
        $('.hours').text(hours);
        $('.days').text(days);
        $('.openclosed').text(text);
        
        if($('.openclosed').text() === 'Odprto'){
            $('.openclosed').css("color","#309f52");
        }else{
            $('.openclosed').css("color","#dd0301");
        }
        
        hideElementIfZero($('.days'));
        hideElementIfZero($('.hours'));
        hideElementIfZero($('.minutes')); 
        
    }

    // check if zero and hide it if true
    function hideElementIfZero(element){
        var openClose = element.text();
        if (openClose === '0' || openClose === '00'){
            element.parent().css("display","none");
        }else{
            element.parent().css("display","inline-block");
        }
    };
    
});
    
