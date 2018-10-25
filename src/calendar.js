class Calendar{


    static RenderCalendar(){
      let container = $('#lobby-container')
      // container.html('')
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
      Calendar.loadNotes();
    }

    static ToggleCalendar(){
      let calendarButton = $('#calendarButton')
      calendarButton.click(function(){
        let container = $('#lobby-container')
        container.html('')
        if (calendarButton.html() === "Show My Calendar"){
          calendarButton.html('Hide My Calendar')
          Calendar.RenderCalendar()
        }
      else if (calendarButton.html() === "Hide My Calendar"){
        calendarButton.html('Show My Calendar')
        $('#calendar').hide()
        container.append(`<div id="lobby-row" class="row"></div>`);
        Controller.renderNotes(Calendar.all.notes)
      }
    })
  }

  static findDay(day){

      return Calendar.all.days.find(d => {
          return d.date === day
      })
  }

  static loadNotes(){
    //   debugger;
    //   let cals = $(".fc-day")
    //   Calendar.all.notes.forEach(function(note){
    //       let date = note.getDay().date
    //
    //
    //   })
    //
    //
    //   for(let i = 0; i < cals.length; i++){
	// console.log(cals[i].dataset)
// }
  }

}

Calendar.weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
