$(() => {
  const dirameny = {};
  $('input:checkbox').change(function () {
    if ($(this).prop('checked')) {
      dirameny[$(this).attr('data-id')] = $(this).attr('data-name');
      let allval = Object.values(dirameny);
      allval = allval.join(', ');
      $('.amenities h4').html(allval);
      console.log(allval);
    } else {
      const idamenyr = $(this).attr('data-id');
      delete dirameny[idamenyr];
      let updateval = Object.values(dirameny);
      updateval = updateval.join(', ');
      console.log(updateval);
      if (updateval.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').html(updateval);
      }
    }
  });
});
