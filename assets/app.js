var urlBase = "https://api.spotify.com/v1/search?q="
var searchTerm = "";
var type = "&type=artist%2Calbum%2Ctrack"
var token = "";
var clientID = "aba6887b24004a76ae602f0e4e0d6da8";
var clientSecret = "384ae6bce3aa4ea2910d8065f0a77ea9";
var embedURL = "https://open.spotify.com/embed/";

//variables for TicketMaster API
var countryCode = 'MX';

$(document).ready(function () {
    //Get access token from Spotify
    $.ajax({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        data: {
            grant_type: "client_credentials"
        },
        headers: {
            Authorization: "Basic " + btoa(clientID + ":" + clientSecret)
        }
    }).then(function (response) {
        //Then save token as variable to use later
        token = response.access_token;
        console.log(token);
    });
    $("#search").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //Assign term to search for based on user input
        searchTerm = $("#userSearch").val();
        console.log(searchTerm);
        //Search Spotify for search term
        $.ajax({
            url: urlBase + searchTerm + type,
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(function (response) {
            //get artist URI
            var uri = response.artists.items[0].uri;
            //divide Spotify URI into segments used in URL
            var uriSplit = uri.split(":");
            console.log(uri);
            console.log(uriSplit);
            $("iframe").attr("src", embedURL + uriSplit[1] + "/" + uriSplit[2]);
        });
    });

    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ searchTerm + "&source=universe&countryCode="+ countryCode + "&apikey=YMjgo66wpjZ9AqXLMjxVNePVxrVlWqmf",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json);
                    // Parse the response.
                    // Do other things.
                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }
      });
});