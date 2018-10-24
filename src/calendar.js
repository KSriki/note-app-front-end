class Calendar{
    static RenderCalendar(){
      let container = $('#lobby-container')
      container.html('')
      let calendarDiv = $('<div>')
      calendarDiv.attr("id", "calendar")
      container.append(calendarDiv)
      calendarDiv.fullCalendar({
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
    }

    static ToggleCalendar(){
      let container = $('#lobby-container')
      container.html('')
      let calendarButton = $('#calendarButton')
      calendarButton.click(function(){
        if (calendarButton.html() === "Show My Calendar"){
          calendarButton.html('Hide My Calendar')
          Calendar.RenderCalendar()
        }
      else if (calendarButton.html() === "Hide My Calendar"){
        calendarButton.html('Show My Calendar')
        $('#calendar').hide()
        Controller.renderNotes(Calendar.all.notes)
      }
    })
  }
}

Calendar.all = { days: [], notes: []}
