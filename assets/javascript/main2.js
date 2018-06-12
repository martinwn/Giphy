$(document).ready(function(){

// Title Animation

document.getElementById("title-image").className += " animate";
setTimeout(function(){
    $("#title-image").fadeTo(1000, 0.01, function(){ 
        $(this).slideUp(150, function() {
            $(this).remove(); 
            $("#title-row").remove();
        }); 
    });
}, 1500);


// *Global Variables
  
    var topics = ["Spongebob", "Rugrats", "Arthur"]
    var allTopics= ["spongebob", "rugrats", "doug", "animaniacs", "rugrats", "gargoyles", "the magic school bus", "pinky and the brain", "daria", "dexter's laboratory", "aaahh!!! real monsters", "arthur", "hey arnold!", "darkwing duck", "tiny toon adventures", "the simpsons", "the powerpuff girls", "ducktales", "talespin", "johnny bravo", "king of the hill", "beavis and butt-head", "captain planet and the planeteers", "recess", "catdog", "the angry beavers", "ed, edd n eddy", "rocket power", "the wild thornberrys", "the adventures of tintin", "cow and chicken", "kipper", "mighty ducks", "pokemon", "south park", "where on earth is carmen sandiago"]
    var checkArray= ["spongebob", "rugrats", "arthur"];

// Renders Original Buttons

    for (i=0; i < topics.length; i++) {
        var originalButtons = $("<button class='btn btn-primary cartoon-button'>");

        $(originalButtons).text(topics[i]);
        $(originalButtons).attr("data-cartoon", topics[i]);
        $("#button-holder").append(originalButtons);
    }

// Adding Buttons On User Input

    $("#button-factory").on("click", function() {

        event.preventDefault();

        var newButton = $("<button class='btn btn-primary cartoon-button capitalize'>");
        var newButtonName = $("#submit-cartoon").val().trim();
        var newButtonNameToLowerCase = newButtonName.toLowerCase();

        if (allTopics.indexOf(newButtonNameToLowerCase) > -1 && checkArray.indexOf(newButtonNameToLowerCase) === -1) {
            checkArray.push(newButtonNameToLowerCase);
            $(newButton).text(newButtonName);
            $(newButton).attr("data-cartoon", newButtonName);
            $("#button-holder").append(newButton);
        };
    
    });

// Ajax Request On Button Click

    $(document).on("click", ".cartoon-button", function() {

        var cartoon = $(this).attr("data-cartoon");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=JA32TS5rjZKXD3SCraNBmRyfAxO3nmJP&limit=10";
        
        $.ajax({
            url: queryUrl,
            method: "GET"
        }) .then(function(response) {

// Creates And Adds Gifs To Page On Ajax Response
                
                for (i=0; i < response.data.length; i++) {

                    var imageContainer = $("<button class='image-container'>");
                    var gifs = $("<img class='pointer clear-image' id='cartoon-image'>");
                    var rating = $("<div class='top-right' id='rating'>");

                    $(rating).text(response.data[i].rating);
                    $(gifs).attr("src", response.data[i].images.fixed_height_still.url);
                    $(gifs).attr("alt", response.data[i].images.fixed_height.url);
                    $(gifs).attr("origin-source", response.data[i].images.fixed_height_still.url);
                    $("#gif-holder").append(imageContainer);
                    $(".image-container").each(function(){
                        $(this).append(gifs, rating);
                    })
                }
                
            });

    });

// Start And Stop Gifs

    $(document).on("click", "img", function() {

        var thingy = $(this).attr("src");  
        var thingy2 = $(this).attr("alt"); 
        var thingy3 = $(this).attr("origin-source"); 

        if ($(this).attr("src") === thingy2) { 
            return $(this).attr("src", thingy3);            
        } else if ($(this).attr("src") === thingy) {
            return $(this).attr("src", thingy2);
        } 

    });

// Random Button 

    $("#random-button").on("click", function produceRandomButton () {

        var randomButton = $("<button class='btn btn-primary capitalize cartoon-button'>")
        var randomButtonName = allTopics[Math.floor(Math.random() * allTopics.length)]; 
        var randomButtonNameToLowerCase = randomButtonName.toLowerCase();

        if (checkArray.indexOf(randomButtonNameToLowerCase) === -1) {
            checkArray.push(randomButtonNameToLowerCase);
            $(randomButton).text(randomButtonName);
            $(randomButton).attr("data-cartoon", randomButtonName);
            $("#button-holder").append(randomButton);
        } else {
            produceRandomButton (); 
        }
        
    });

// Clear Button

    $("#clear-gifs").on("click", function() {
        $(".image-container").each(function() {
            this.remove();
        });
    });

// Hover Image Display

    $(document).on("mouseover", "img", function () {
    });
    
});

    
