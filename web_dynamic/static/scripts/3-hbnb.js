document.addEventListener('DOMContentLoaded', function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (content) {
    if (content.status === 'OK') {
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
          console.log(response);
          $.each(response, function (_, place) {
              const valueHTML = '<article class="site one"><div class="info"> <h2>' + place.name +
              '</h2> <div class="price_by_night">' + place.price_by_night +
              '</div></div><div class="information"><div class="max_guest"><div class="icon_guests"></div>' +
              place.max_guest + ' Guests</div><div class="number_rooms"><div class="icon_bedrooms"></div>' +
              place.number_rooms + ' Bedroom</div><div class="number_bathrooms"><div class="icon_bathrooms"></div>' +
              place.number_bathrooms + ' Bathroom</div></div><div class="description"><p>' + place.description +
              '</p></div> </article>';
              $('.places').append(valueHTML);
          });
        }
      });
    }
  });
});
