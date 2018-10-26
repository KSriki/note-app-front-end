class Calendar {

    static RenderCalendar() {
        let container = $('#lobby-container')
        // container.html('')
        let calendarDiv = $('<div>')
        calendarDiv.attr("id", "calendar")
        container.append(calendarDiv)
        calendarDiv.fullCalendar({
            // header: {
            //     center: 'agendaSevenDay,month' // buttons for switching between views
            // }
            // views: {
            //     agendaSevenDay: {
            //         type: 'agenda',
            //         duration: {
            //             days: 7
            //         },
            //         buttonText: '7 day'
            //     }
            // }
        });
        Calendar.loadNotes();

        // debugger;
        //hacky but works
        $(".fc-prev-button").click(Calendar.loadNotes)
        $(".fc-next-button").click(Calendar.loadNotes)
        $(".fc-month-button").click(Calendar.loadNotes)
        $(".fc-today-button").click(Calendar.loadNotes)


    }

    static ToggleCalendar() {
        let calendarButton = $('#calendarButton')
        calendarButton.click(function() {
            let container = $('#lobby-container')
            container.html('')
            if (calendarButton.html() === "Show My Calendar") {
                calendarButton.html('Hide My Calendar')
                Calendar.RenderCalendar()
            } else if (calendarButton.html() === "Hide My Calendar") {
                calendarButton.html('Show My Calendar')
                $('#calendar').hide()
                container.append(`<div id="lobby-row" class="row"></div>`);
                Controller.renderNotes(Calendar.all.notes)
            }
        })
    }

    static findDay(day) {

        return Calendar.all.days.find(d => {
            return d.date === day
        })
    }

    static clearNotes(){
        let cals = $(".fc-day")
        for (let i = 0; i < cals.length; i++) {
            // debugger
            cals[i].innerText = "";
        }
    }
    static loadNotes() {
        // debugger;
        Calendar.clearNotes();
        let cals = $(".fc-day")

        let copy = Calendar.all.notes.map(note => {

            if (note.day_id != 1) {
                return Object.assign({}, note, {
                    date: note.getDay().date,
                    type: note.getType().name
                });
            } else {
                return {};
            }
        }).filter(obj => {
            return !jQuery.isEmptyObject(obj)
        });

        // debugger;
        copy.sort(function(c1, c2) {
            // debugger;
            let d1 = new Date(c1.date);
            let d2 = new Date(c2.date);
            if (d1 > d2) {
                return 1;
            } else if (d1 < d2) {
                return -1;
            } else {
                return 0;
            }

        });

        copy.forEach(function(note) {

            let date = note.date
            for (let i = 0; i < cals.length; i++) {
                // debugger
                if (cals[i].dataset.date === date) {

                    // cals[i].classList.add("card-body");
                    //find again
                    // debugger;

                    if (!cals[i].innerHTML) {
                        let surround = document.createElement("div");
                        surround.setAttribute("class", "scrollable")
                        cals[i].appendChild(surround);
                        let listCal = document.createElement("ul");
                        listCal.setAttribute("class", "list-group")
                        listCal.id = `list-${note.id}`

                        surround.appendChild(listCal);
                    }

                    // debugger;
                    let inner = document.createElement("li");
                    inner.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");

                    inner.innerHTML = `${note.name}`;

                    if (note.type == "Urgent") {
                        inner.classList.add("class", "bg-primary")
                    } else if (note.type == "Work") {
                        inner.classList.add("class", "bg-danger")
                    } else if (note.type == "Personal") {
                        inner.classList.add("class", "bg-info")
                    }
                    else if (note.type == "Not Urgent") {
                        inner.classList.add("class", "border-info")
                    } else {
                        inner.classList.add("class", "bg-secondary")

                    }

                    cals[i].children[0].children[0].appendChild(inner)

                }
            }

        });
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

Calendar.weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
