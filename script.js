// Event for buttons
$(document).ready(function () {
    console.log("file link successful");

    var arrayTopic = ['chihuahuas', 'Adam Sandler', 'squirrels', 'peonies', 'fashion', 'vodka martini', 'Paul Rudd', 'peanutbutter'];

    //jquery plugin to stop/start giphy animation
    // $(topicImage).freezeframe();--THIS ISN'T WORKING

    /*
    Sample Code to start/stop animation--but can't figure out universal src, must use index to reference specific api url.
    $(topicImage).on("click", function () {
        var state = $(this).attr("data-state")
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


    })

        ---------------------------------------------------------------*/

    // Function for displaying array & input buttons
    function renderButtons() {

        // Empties buttons
        $("#arrayButtons").empty();

        // Looping through the array 
        for (var i = 0; i < arrayTopic.length; i++) {

            // Dynamicaly generating buttons from array 

            var a = $("<button>");
            // Adding a class
            a.addClass("fav-things");
            a.attr("data-topic", arrayTopic[i]);
            a.text(arrayTopic[i]);
            // Adding to HTML
            $("#gifs-appear-here").append(a);
        }
    }

    // events where one button is clicked
    $("#add-fav-things").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // supposed to grab text from the input box
        var topic = $("#topic-input").val().trim();

        arrayTopic.push(topic);

        // calls function to buttons of input text
        renderButtons();
    });
    // calls function to display the initial list of movies
    renderButtons();


    // URL search for Giphy
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        arrayTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

    // AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function (response) {
            console.log(queryURL);
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Creating a div called "item"
                var gifDiv = $("<div class='item'>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var topicImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                topicImage.attr("src", results[i].images.fixed_height.url);

                // Append paragraph and topicImage to created "gifDiv" 
                gifDiv.append(p);
                gifDiv.append(topicImage);

                // Prepending the gifDiv to the div in the HTML
                $("body").append(gifDiv);



            }

        });
});
