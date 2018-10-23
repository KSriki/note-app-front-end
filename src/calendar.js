$(function() {

  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    header: {
      center: 'agendaSevenDay,month' // buttons for switching between views
    },
    views: {
      agendaSevenDay: {
        type: 'agenda',
        duration: { days: 7 },
        buttonText: '7 day'
      }
    }
  });
  calendarButtonListener()
});

  function hideCalendar() {
    let mycalendar = $("#calendar")[0];
    mycalendar.style.visibility = "hidden"
}

  function toggleCalendar(){
    let mycalendar = $("#calendar")[0];
    let calendarButton = $("#calendarButton")[0]
    if (mycalendar.style.visibility === "hidden"){
      calendarButton.innerText = "Hide Calendar"
      mycalendar.style.visibility = "visible"
    }
    else if (mycalendar.style.visibility === "visible") {
      calendarButton.innerText = "Show Calendar"
      mycalendar.style.visibility = "hidden"
    }
}
  function calendarButtonListener(){
    $('#calendarButton').click(toggleCalendar)
  }

class Calendar{
    static RenderCalendar(){
      let container = $('#lobby-container')
      debugger
      container.html('')
      let calendarDiv = $('<div>')
      calendarDiv.attr("id", "calendar")
      container.append(calendarDiv)
    }

    static HideCalendar(){
      $('#calendarButton').click(function(){
        $('#calendar').hide()
      })
    }
  }
