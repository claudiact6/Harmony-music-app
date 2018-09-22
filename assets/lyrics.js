//variables for Lyrics API
var countryCode = 'US';
var searchTerm = '';


$(document).ready(function () {

    $("#search").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //Assign term to search for based on user input
        searchTerm = $("#userSearch").val();
        //Search Lyrics for artisName and songName
    });
    
    $("#lyricsButton").on("click", function(event) {
        //Prevent default behavior
        event.preventDefault();
        console.log("clicked lyrics button");
        var songName = $(".as.at.ar.al.au.av.aw.ax.ay").html();
        console.log(songName);
        artistName = searchTerm;
        console.log(artistName);
        $.ajax({
            type:"GET",
            url:"https://orion.apiseeds.com/api/music/lyric/"+ artistName +"/"+ songName + "?apikey=ZozHgjxaFPqVspfH5KlFNVz4wbvJSpFZb2GGjuDEwnVNznnzEGHMBQsZgXQHMOLF",
            async:true,
            dataType: "json",
            success: function(lyrics) {
                        console.log(lyrics.result.track[text]);
                        // Parse the response.
                        // Do other things.
                        $("pre").html(lyrics.result.track[text]);
            },
            error: function(xhr, status, err) {
                $("pre").html("Sorry we could not find the lyrics for your song");
            }
        });
    });


});

