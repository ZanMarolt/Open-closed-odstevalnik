$(document).ready(function() {
        
    //get PHP timestamp and saving it as a variable as beginning of time
    var timestamp = $('#PHPDate').text()*1000;
    
    // get PHP timestamp and saving it as a variable for incrementation every second
    var timestampIncremented = $('#PHPDate').text()*1000;

    //transforming the PHP timestamp to javascript Date object
    var incrementedDate = new Date(timestampIncremented);
    var currentdate = new Date(timestamp); 
    /* //Logging currentDate
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    console.log(datetime);
    */
    
    // increment time every second for one second
    function incrementDate(){
        
        //increase date for one second
        timestampIncremented =   timestampIncremented+1000; 
        incrementedDate = new Date(timestampIncremented);
        
        return incrementDate;
        
    }
    
    
    var intervl = setInterval(incrementDate,1000);



    // Names of months and days in an array
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var imenaDnevov = ['nedelja','ponedeljek','torek','sreda','cetrtek','petek','sobota'];

    //dnevi in odpiralni casi
    var dnevi  = [
        nedelja = {
            dan         :'nedelja',
            zacetekUra  :'12',
            zacetekMin  :'00',
            konecUra    :'15',
            konecMin    :'00'
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
            zacetekUra  :'12',
            zacetekMin  :'44',
            konecUra    :'14',
            konecMin    :'32'
        },
        sobota = {
            dan         :'sobota',
            zacetekUra  :'8',
            zacetekMin  :'00',
            konecUra    :'23',
            konecMin    :'00'
        }
        ];

    //Formatting CurrentDate for comparison
    var Datum = {
        mesec   :monthNames[currentdate.getMonth()],
        dan     :currentdate.getDate(),
        imeDneva:imenaDnevov[currentdate.getDay()],
        leto    :currentdate.getFullYear(),
        ura     :currentdate.getHours(),
        min     :currentdate.getMinutes()
    }
    
    //calculate change in time 
    function getTimeRemaining(endtime){
      //also update visibility if element zero
      checkZero();    

      //calculate change in time
      var t = Date.parse(endtime) - Date.parse(incrementedDate);

      var seconds = Math.floor( (t/1000) % 60 );
      var minutes = Math.floor( (t/1000/60) % 60 );
      var hours = Math.floor( (t/(1000*60*60)) % 24 );
      var days = Math.floor( t/(1000*60*60*24) );
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    
    //initialize clock adn update it every second

    function initializeClock(id, endtime){
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock(){

        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if(t.total<=0){
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock,1000);
    
    }

    // Check whether or not the restaurant is open or closed   
    function checkRestaurant(){
    
        var danasnjiDan = dnevi[currentdate.getDay()];
        var jutrisnjiDan = dnevi[currentdate.getDay()+1];

        if (danasnjiDan.zacetekUra*1 > Datum.ura || danasnjiDan.konecUra*1 < Datum.ura){

            console.log('ZAPRTO');
            $('.openclosed').text('Odpremo').css("color","red");
            $('.adjx').text('odpremo čez');
            dan = danasnjiDan.zacetekUra;
            open = danasnjiDan.zacetekMin;
            incr = Datum.dan;
            console.log(Datum.dan)
            rok(dan, open, incr);

        }else if (danasnjiDan.zacetekUra*1 === Datum.ura && danasnjiDan.zacetekMin*1 > Datum.min){

            console.log('ZAPRTO');
            $('.openclosed').text('Zaprto').css("color","red");
            $('.adjx').text('odpremo čez');
            dan = danasnjiDan.zacetekUra;
            open = danasnjiDan.zacetekMin;
            incr = Datum.dan;
            rok(dan, open, incr);

        }else if(danasnjiDan.konecUra*1 < Datum.ura || danasnjiDan.konecUra*1 === Datum.ura && danasnjiDan.konecMin*1 <= Datum.min){
            console.log('ZAPRTO');
            $('.openclosed').text('Zaprto').css("color","red");
            $('.adjx').text('odpremo čez');
            dan = jutrisnjiDan.zacetekUra;
            open = jutrisnjiDan.zacetekMin;
            incr = Datum.dan+1;
            rok(dan, open, incr);
        }else if(danasnjiDan.konecUra*1 < Datum.ura || danasnjiDan.konecUra*1 === Datum.ura && danasnjiDan.konecMin*1 <= Datum.min){
            console.log('ZAPRTO');
            $('.openclosed').text('Zaprto').css("color","red");
            $('.adjx').text('odpremo čez');
            dan = jutrisnjiDan.zacetekUra;
            open = jutrisnjiDan.zacetekMin;
            incr = Datum.dan+1;
            rok(dan, open, incr);
        }else {
            console.log('ODPRTO');
            $('.openclosed').text('Odprto').css("color","green");
            $('.adjx').text('še');
            dan = danasnjiDan.konecUra;
            open = danasnjiDan.konecMin;
            incr = Datum.dan;
            rok(dan, open, incr);

        }

        // Get the countdown deadline till the countdown ends

        function rok(dan, open, incr){

            var deadline = Datum.mesec+' '
            +incr+' '
            +Datum.leto+' '
            +dan+':'
            +open+':00'
            +' UTC+0100';

        console.log(deadline);
        console.log('updated');
        initializeClock('clockdiv', deadline);

        }
    }
    
    checkRestaurant();
    var rest = setInterval(checkRestaurant,60000);
    
    //some styling
    function hideElementIfZero(jquery){
        var openClose = jquery.text();
        if (openClose === '0' || openClose === '00'){
            jquery.parent().css("display","none");
        }
    };
    
    function checkSecZero() {
        secs = $('.seconds').text()*1;
        mins = $('.minutes').text()*1;
        hrs = $('.hours').text()*1;
        dys = $('.days').text()*1;
        
        if (secs === 0 && dys === 0  && hrs === 0  && mins === 0){
            
            $('.days').parent().css("display","inline-block");
            $('.hours').parent().css("display","inline-block");
            $('.minutes').parent().css("display","inline-block");
            console.log('Displayed back!');
            
        }else {
            console.log('no need to update!');
        }
    }
    
    function checkZero(){
    
    hideElementIfZero($('.days'));
    hideElementIfZero($('.hours'));
    hideElementIfZero($('.minutes'));
    checkSecZero();
        
    }
    
    checkZero();
       
    
});
    
