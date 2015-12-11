<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>My Simple Website</title>

    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <div class="container">
        <div class="row">
            <p id="PHPDate"><?php echo $newticket['DateCreated'] = strtotime('now'); ?>

            <div class="col-md-12" style="text-align: center;">
                <h1 id="title">Števec</h1>
                <div id="clockdiv">
                <div>
                    <span class="openclosed">Closed</span>
                    <div class="smalltext adjx">še</div>
                  </div>
                  <div>
                    <span class="days"></span>
                    <div class="smalltext">Dni</div>
                  </div>
                  <div>
                    <span class="hours"></span>
                    <div class="smalltext">Ur</div>
                  </div>
                  <div>
                    <span class="minutes"></span>
                    <div class="smalltext">Minut</div>
                  </div>
                  <div>
                    <span class="seconds"></span>
                    <div class="smalltext">Sekund</div>
                  </div>
                </div>
            </div>

        </div>

    </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="js/app.js"></script>
    
    
</body>
</html>

