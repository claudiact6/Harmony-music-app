//variables for TicketMaster API
var countryCode = 'US';
var searchTerm = '';


$(document).ready(function () {

    $("#search").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //Assign term to search for based on user input
        searchTerm = $("#userSearch").val();
        console.log(searchTerm);
        //Search Spotify for search term
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


});
