$(function () {

  const StatesList = {};
  const CitiesList = {};
  const AmenitiesList = {};

  $('div.amenities li input').change(

    function () {

      if ($(this).is(':checked')) {
        AmenitiesList[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete AmenitiesList[($(this).attr('data-id'))];
      }
      $('div.amenities h4').html(Object.values(AmenitiesList).join(', ') || '&nbsp;');

    });

  $('div.locations h2 > input').change(

    function () {

      if ($(this).is(':checked')) {
        StatesList[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete StatesList[($(this).attr('data-id'))];
      }
      const StateCity = Object.values(StatesList).concat(Object.values(CitiesList));
      $('div.locations h4').html(StateCity.join(', ') || '&nbsp;');

    });

  $('div.locations li > input').change(

    function () {

      if ($(this).is(':checked')) {
        CitiesList[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete CitiesList[($(this).attr('data-id'))];
      }
      const StateCity = Object.values(StatesList).concat(Object.values(CitiesList));
      $('div.locations h4').html(StateCity.join(', ') || '&nbsp;');

    });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {

    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }

  });

  $('button').click(() =>
    $.ajax('http://0.0.0.0:5001/api/v1/places_search', {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        states: Object.keys(StatesList),
        cities: Object.keys(CitiesList),
        amenities: Object.keys(AmenitiesList)
      }),
      success: data => {
  $('section.places').empty();
  $('div.placesh1').empty();
  $('div.placesh1').append('<h1>Places</h1>');
    for (const place of data) {
      const html_temp = `<article>
        <div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">
      $${place.price_by_night}
          </div>
        </div>
        <div class="information">
    <div class="max_guest">
      ${place.max_guest} Guests
          </div>
    <div class="number_rooms">
      ${place.number_rooms} Bedrooms
          </div>
    <div class="number_bathrooms">
      ${place.number_bathrooms} Bathroom
          </div>
        </div>
          <div class="description">
      ${place.description}
          </div>
      </ article>`;
      $('section.places').append(html_temp);
          }
  }
  }));
});
