var urlBase = "https://api.spotify.com/v1/search?q="
var searchTerm = "";
var type = "&type=artist%2Calbum%2Ctrack"
var token = "";
var baseAuth = "https://accounts.spotify.com/authorize?client_id="
var clientID = "aba6887b24004a76ae602f0e4e0d6da8";
var responseType = "&response_type=token";
var redirURI = "&redirect_uri=https://claudiact6.github.io/group-project-1/player";
var embedURL = "https://open.spotify.com/embed/";



$(document).ready(function () {

    $("#login").on("click", function(event) {
        //Prevent default behavior
        event.preventDefault();
        //redirect to auth
        window.location = baseAuth + clientID + redirURI + responseType;
    });

    $("#search").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //Get token from URL
        var authURL = window.location.href;
        var splitAuth = authURL.split("&");
        var tokenSplit = splitAuth[0].split("=");
        var token = tokenSplit[1];
        console.log("splitAuth: " + splitAuth);
        console.log("tokenSplit: " + tokenSplit);
        console.log("token: " + token);
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

    $(".ay").on("click", function(event) {
        var song = $(this).text();
    });


});