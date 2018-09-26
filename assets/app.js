var urlBase = "https://api.spotify.com/v1/search?q="
var searchTerm = "";
var type = "&type=track";
var limit = "&limit=10";
var token = "";
var baseAuth = "https://accounts.spotify.com/authorize?client_id="
var clientID = "aba6887b24004a76ae602f0e4e0d6da8";
var responseType = "&response_type=token";
var redirURI = "&redirect_uri=https://claudiact6.github.io/group-project-1/player";
var embedURL = "https://open.spotify.com/embed/";
var tracks = [];
var sortedTracks = [];
var track = "";
function compare(a, b) {
    console.log("sorting tracks");
    return b.popularity-a.popularity;
}

$(document).ready(function () {
    $("iframe").hide();

    //Firebase *********************
    var config = {
        apiKey: "AIzaSyAu_x49vopCuBPDIbzOChkbEmjTywGAejg",
        authDomain: "harmony-2-7b899.firebaseapp.com",
        databaseURL: "https://harmony-2-7b899.firebaseio.com",
        projectId: "harmony-2-7b899",
        storageBucket: "harmony-2-7b899.appspot.com",
        messagingSenderId: "723221071715"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#login").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //redirect to auth
        window.location = baseAuth + clientID + redirURI + responseType;
    });

    $("#search").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //Empty song list table
        $("#songlist").empty();
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

        //Save search term to firebase *********************

        database.ref().push(searchTerm);

        //Search Spotify for search term
        $.ajax({
            url: urlBase + searchTerm + type + limit,
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(function (response) {
            tracks = response.tracks.items;
            //put the songs in order
            sortedTracks = sortedTracks.sort(compare);
            console.log(sortedTracks);
            //for loop to display songs
            for (i = 0; i < sortedTracks.length; i++) {
                var tr = $("<tr>");
                var td = $("<td>");
                td.text(sortedTracks[i].name);
                console.log("sortedTracks[i].name");
                td.attr("class", "track");
                td.attr("id", i);
                tr.append(td);
                $("#songlist").append(tr);
            }
        });
        
        $(document).on("click", ".track", function () {
            //show player
            $("iframe").show();
            //save song name for lyrics api
            track = $(this).text();
            //get clicked position in tracks array
            var pos = $(this).attr("id");
            console.log("song position in array is: ", pos);
            //get song URI
            var uri = sortedTracks[pos].uri;
            //divide Spotify URI into segments used in URL
            var uriSplit = uri.split(":");
            console.log(uri);
            console.log(uriSplit);
            //tell player which song to play
            $("iframe").attr("src", embedURL + uriSplit[1] + "/" + uriSplit[2]);
            //Get and show the lyrics:
            console.log("artist to get lyrics for is: ", searchTerm);
            console.log("song title to get lyrics for is: ", track);
            $.ajax({
                type:"GET",
                url:"https://orion.apiseeds.com/api/music/lyric/"+ searchTerm +"/"+ track + "?apikey=ZozHgjxaFPqVspfH5KlFNVz4wbvJSpFZb2GGjuDEwnVNznnzEGHMBQsZgXQHMOLF",
                async:true,
                dataType: "json",
                success: function(lyrics) {
                            console.log(lyrics.result.track.text);
                            $("pre").html(lyrics.result.track.text);
                },
                error: function() {
                    $("pre").html("Sorry, lyrics not found!");
                }
            });
        })
    });


});