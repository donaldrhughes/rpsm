//Wait for browser to fully load

$(document).ready(function () {

    // Declare Global Vars
    //================================================
    var numPlayers = 2;
    var players = [];
    var pimgSize = 50;
    var rpsSize = 100;
    var database;
    var ctext;



    //Main Procedure
    //===============================================
    dbauth();
    loadPlayers();
    timer();
    choice(i);


    //Debug
    console.log(players);
    console.log(players[1]);
    console.log(players[0]);
    console.log(database);



    //Functions
    //==========================================

    function setChoice() {

        database.ref().set({

            p1guess: ctext
        });
    }

    function choice(players, i) {


        document.onkeyup = function (event) {

            var p1guess = event.key;


            if (p1guess == "r") {
                ctext = "Rock";
                $("#p1Choice").html(ctext);
            }
            else if (p1guess == "s") {
                ctext = "Scissors";
                $("#p1Choice").html(ctext);
            }
            else if (p1guess == "p") {
                ctext = "Paper";
                $("#p1Choice").html(ctext);


            }
            else {
                ctext = "Not valid."
                $("#p1Choice").html(ctext);
            }
            setChoice(players, p1guess, i, ctext)

        }
    }


    function loadPlayers(player) {
        for (i = 1; i <= numPlayers; i++) {
            player = new Player(i, "player" + i, 0, 0, choice, "assets/images/avatar" + i + ".png", pimgSize, pimgSize, "assets/images/rock.png", rpsSize, rpsSize, "assets/images/scissors.png", rpsSize, rpsSize, "assets/images/paper.png", rpsSize, rpsSize);
            players.push(player);
        }

        players.forEach(function (elem, i) {
            //emptys the divs

            $("#pImg" + (players.pnum)).empty();
            $("#pChoice" + (players[i].pnum)).empty();
            $("#pWin" + (players[i].pnum)).empty();
            $("#pLoss" + (players[i].pnum)).empty();


            //Loads the player avatar
            playerImg = $("<img>");
            playerImg.addClass("img-fluid m-1");
            playerImg.attr("src", elem.src);
            playerImg.attr("width", elem.width);
            playerImg.attr("height", elem.height);

            $("#p" + (players[i].pnum) + "Img").append(playerImg);


            //loads the player's choice Dom
            playerChoice = $("<div>");
            playerChoice.attr("choice", elem.choice);
            playerChoice.html("Press: R, S, or P")
            $("#p" + (players[i].pnum) + "Choice").append(playerChoice);

            //loads the player's winobj
            playerWins = $("<div>");
            playerWins.addClass("wins");
            playerWins.attr("wins", elem.wins);
            playerWins.html("Wins: " + elem.wins);
            $("#p" + (players[i].pnum) + "Win").append(playerWins);


            //loads the player's loss obj
            playerLoss = $("<div>");
            playerLoss.attr("losses", elem.losses);
            playerLoss.addClass("losses");
            playerLoss.html("Losses: " + elem.losses);
            $("#p" + (players[i].pnum) + "Loss").append(playerLoss);
            console.log(players)

            //Loads the rock button
            rockImg = $("<img>");
            rockImg.addClass("img-fluid m-1");
            rockImg.attr("src", elem.rock);
            rockImg.attr("width", elem.rw);
            rockImg.attr("height", elem.rh);
            rockImg.on("click", function () {
                var p1guess = "Rock";

                $("#p1Choice").html(p1guess);

                setChoice(players, p1guess, i, ctext)


            })



            $("#rock" + (players[i].pnum)).append(rockImg);

            //Loads the paper button
            paperImg = $("<img>");
            paperImg.addClass("img-fluid m-1");
            paperImg.attr("src", elem.paper);
            paperImg.attr("width", elem.pw);
            paperImg.attr("height", elem.ph);

            paperImg.on("click", function () {
                var p1guess = "Paper";

                $("#p1Choice").html(p1guess);

            })
            $("#paper" + (players[i].pnum)).append(paperImg);


            //Loads the scissors button
            sciImg = $("<img>");
            sciImg.addClass("img-fluid m-1");
            sciImg.attr("src", elem.scissors);
            sciImg.attr("width", elem.sw);
            sciImg.attr("height", elem.sh);
            sciImg.on("click", function () {
                var p1guess = "Scissors";

                $("#p1Choice").html(p1guess);

            })

            

            $("#scissors" + (players[i].pnum)).append(sciImg);

        })

    };


    function Player(pnum, name, wins, losses, choice, src, width, height, rock, rw, rh, scissors, sw, sh, paper, ph, pw) {
        this.pnum = pnum;
        this.name = name;
        this.wins = wins;
        this.losses = losses;
        this.choice = choice;
        this.src = src;
        this.width = width;
        this.height = height;
        this.rock = rock;
        this.rw = rw;
        this.rh = rh;
        this.scissors = scissors;
        this.sw = sw;
        this.sh = sh;
        this.paper = paper;
        this.pw = pw;
        this.ph = ph;

    };

    function dbauth() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC06ZfXq5_8ShXOSStR4KdDvWfMX57PwUA",
            authDomain: "rpsm-4f9d5.firebaseapp.com",
            databaseURL: "https://rpsm-4f9d5.firebaseio.com",
            projectId: "rpsm-4f9d5",
            storageBucket: "",
            messagingSenderId: "759048104777"
        };
        firebase.initializeApp(config);

        database = firebase.database();

    }
    //timer function
    var time;
    var sec = 6;
    var timeAllow = sec;
    $("#timer").text("Time Remaining:" + timeAllow);

    function timer() {
        $("#timer").text("Time Remaining:" + timeAllow);
        time = setInterval(timeLimit, 1000);


    };

    function timeLimit() {
        var timeDec = --timeAllow;
        $("#timer").text("Time Remaining:" + timeDec);
        if (timeAllow == 0) {
            $("#timer").append("Time Limit Expired!");
            reset();
        }
    }
    //reset function
    function reset() {
        clearInterval(time);
        timeAllow = sec;

    };

    function evalWin() {
        if ((p1Guess === "Rock") || (p1Guess === "Paper") || (p1Guess === "Scissors")) {

            if ((p1Guess === "r") && (p2guess === "s")) {
                $("#results").html("P1ayer1 wins");

            } else if ((p1Guess === "r") && (p2guess === "p")) {
                $("#results").html("P1ayer2 wins");

            } else if ((p1Guess === "s") && (p2guess === "r")) {

                $("#results").html("P1ayer2 wins");
            } else if ((p1Guess === "s") && (p2guess === "p")) {

                $("#results").html("P1ayer1 wins");
            } else if ((p1Guess === "p") && (p2guess === "r")) {

                $("#results").html("P1ayer1 wins");
            } else if ((p1Guess === "p") && (p2guess === "s")) {

                $("#results").html("P1ayer2 wins");
            } else if (p1Guess === p2guess) {

                $("#results").html("Tie");
            }
        }
    }
});