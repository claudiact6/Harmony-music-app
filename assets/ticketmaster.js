//variables for TicketMaster API
var searchTerm = '';
var tbody = $('<tbody>');

var ticketLink = '';


$(document).ready(function () {

    $("#search").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();
        //Assign term to search for based on user input
        searchTerm = $("#userSearch").val();
        console.log(searchTerm);
        $('.tableticket').empty();

        //Search TicketMaster for search term
        $.ajax({
            type:"GET",
            url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ searchTerm +"&source=ticketmaster&countryCode=MX&apikey=YMjgo66wpjZ9AqXLMjxVNePVxrVlWqmf",
            async:true,
            dataType: "json",
            success: function(json) {
                        console.log(json);
                        if(json._embedded){
                            $('.firstDate').empty();
                            $('.secondDate').empty();
                            $('.thirdDate').empty();

                            for(var i = 0; i < json._embedded.events.length; i++){
                            var ticketRow = $('<tr>');
                            var ticketVenue = $('<td>');
                            var ticketHeading = $('<th>');
                            var ticketButton = $('<button>');
                            debugger;
                            $('.tableticket').append(ticketRow);
                            console.log('yay');
                            $(ticketRow).append(ticketHeading);
                            $(ticketRow).append(ticketVenue);
                            $(ticketRow).append(ticketButton);
                            $(ticketHeading).html(json._embedded.events[i].dates.start.localDate + '<br>');
                            $(ticketHeading).append(json._embedded.events[i].dates.start.localTime);
                            $(ticketVenue).html(json._embedded.events[i]._embedded.venues[0].name);
                            ticketLink = json._embedded.events[i].url;
                            console.log(ticketLink);
                            $(ticketButton).html('<a href=' + ticketLink +'>'+ 'Buy Tickets' + '</a>');
                            $(ticketButton).addClass('btn btn-outline-primary ticketButton');
                            $('a').attr('target', '_blank');

                        }

                            console.log(json._embedded.events[0].dates.start.localDate)
                            console.log(json._embedded.events[0].dates.start.localTime)
                            console.log(json._embedded.events[0]._embedded.venues[0].name)
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
