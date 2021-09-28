const dirameny = {};
$(() => {
  $('input:checkbox').change(function () {
    if ($(this).prop('checked')) {
      dirameny[$(this).attr('data-id')] = $(this).attr('data-name');
      let allval = Object.values(dirameny);
      allval = allval.join(', ');
      $('.amenities h4').html(allval);
    } else {
      const idamenyr = $(this).attr('data-id');
      delete dirameny[idamenyr];
      let updateval = Object.values(dirameny);
      updateval = updateval.join(', ');
      if (updateval.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').html(updateval);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
    if (data.status !== 'OK') {
      $('DIV#api_status').removeClass('available');
    }
  });
});

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
          $.each(response, function (i, place) {
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

document.addEventListener('DOMContentLoaded', function () {
  $('.button-filter').click(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (content) {
      if (content.status === 'OK') {
        let result;
        const list = [];
        for (const [key, value] of Object.entries(dirameny)) {
          result = key;
          list.push(result);
        }
        $('SECTION.places').empty();
        $.ajax({
          url: 'http://0.0.0.0:5001/api/v1/places_search/',
          type: 'POST',
          data: JSON.stringify({ amenities: list }),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (response) {
            console.log(response);
            $.each(response, function (i, place) {
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
});
