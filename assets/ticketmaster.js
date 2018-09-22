//variables for TicketMaster API
var countryCode = 'US';
var searchTerm = '';
var tbody = null;
var ticketDate = null;
var ticketRow = null;
var ticketVenue = null;
var ticketHeading = null;


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
            url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ searchTerm +"&source=ticketmaster&countryCode=MX&apikey=YMjgo66wpjZ9AqXLMjxVNePVxrVlWqmf",
            async:true,
            dataType: "json",
            success: function(json) {
                        console.log(json);
                        if(json._embedded){
                            console.log('yay');
                            $('.tableticket').empty();

                            console.log(json._embedded.events[0].dates.start.localDate)
                            console.log(json._embedded.events[0].dates.start.localTime)
                            console.log(json._embedded.events[0]._embedded.venues[0].name)
                            console.log(json._embedded.events[0]._embedded.venues[0].url)
                        } else {
                            console.log('nay');
                            $('.firstDate').empty();
                            $('.secondDate').empty();
                            $('.thirdDate').empty();
                            $('.firstDate').html('<th>'+'Not Lucky! There is no concert in your Country soon.'+'</th>');
                        }
                        // Parse the response.
                        // Do other things.
            },
            error: function(xhr, status, err) {
                        // This time, we do not end up here!
            }
        });
    });


});
