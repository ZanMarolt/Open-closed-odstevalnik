$(document).ready(function() {
    
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var imenaDnevov = ['nedelja','ponedeljek','torek','sreda','cetrtek','petek','sobota'];

    //dnevi in odpiralni casi
    var dnevi  = [
        nedelja = {
            dan         :'nedelja',
            zacetekUra  :'11',
            zacetekMin  :'00',
            konecUra    :'16',
            konecMin    :'39'
        },

        ponedeljek = {
            dan         :'ponedeljek',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        },
        torek = {
            dan         :'torek',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        },
        sreda = {
            dan         :'sreda',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        },
        cetrtek = {
            dan         :'cetrtek',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        },
        petek = {
            dan         :'petek',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        },
        sobota = {
            dan         :'sobota',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        }
    ];
    
    // Get PHP timestamp and saving it as a variable as beginning of time also converting from miliseconds to seconds
    var currentTimestamp        = $('#PHPDate').text()*1000;
    var incrementedTimestamp    = $('#PHPDate').text()*1000;
    var startTimestamp          = $('#PHPDate').text()*1000;
    var endTimestamp            = $('#PHPDate').text()*1000;
    
    // Start the seconds rolling
    function initiateSeconds(){
        incrementedTimestamp = incrementedTimestamp+1000;
    }
    
    // Keep incrementing seconds every second
    var secondsInterval = setInterval(initiateSeconds,1000);
    
    // Calculate startTimestamp
    function calculateStartTimestamp() {
        
        // Get minutes and seconds and substract them to get the startDay timestamp
        var todaysDaySeconds = new Date(currentTimestamp).getSeconds()*1000;
        var todaysDayMinutes = new Date(currentTimestamp).getMinutes()*1000*60;
        var todaysDayHours = new Date(currentTimestamp).getHours()*1000*60*60;

        // Calculate Today's day beginning timestamp
        var dayBeginningTimestamp = currentTimestamp-todaysDaySeconds-todaysDayMinutes-todaysDayHours;

        // Calculate Today's start Timestamp
        var day = new Date(currentTimestamp).getDay()
        var startDayMinutes = dnevi[day].zacetekMin*1000*60;
        var startDayHours = dnevi[day].zacetekUra*1000*60*60;

        startTimestamp = dayBeginningTimestamp+startDayMinutes+startDayHours;

        // just a comment for me to copy
        // console.log('Secs: '+todaysDaySeconds+' Mins: '+todaysDayMinutes+' Hrs: '+todaysDayHours);
        
    }
    
    calculateStartTimestamp();
    
    // Calculate endTimestamp
    function calculateEndTimestamp() {
        
        // Get minutes and seconds and substract them to get the endDay timestamp
        var todaysDaySeconds = new Date(currentTimestamp).getSeconds()*1000;
        var todaysDayMinutes = new Date(currentTimestamp).getMinutes()*1000*60;
        var todaysDayHours = new Date(currentTimestamp).getHours()*1000*60*60;

        // Calculate Today's day beginning timestamp
        var dayBeginningTimestamp = currentTimestamp-todaysDaySeconds-todaysDayMinutes-todaysDayHours;

        // Calculate Today's end Timestamp
        var day = new Date(currentTimestamp).getDay()
        var endDayMinutes = dnevi[day].konecMin*1000*60;
        var endDayHours = dnevi[day].konecUra*1000*60*60;

        endTimestamp = dayBeginningTimestamp+endDayMinutes+endDayHours;
        
    }
    
    calculateEndTimestamp();

    
    
    

    
    
    
    
    
    
    
    
    
});
    
