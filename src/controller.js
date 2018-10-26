class Controller {

    static init() {
        // on page load
        Calendar.all = { days: [], notes: [], types:[], cals:[]}
        Adapter.fetchNotes().then(json => {
            Controller.createDaysFromNotes(json);
            Controller.loadTypesAndHandleNotes(json);
        })
        Controller.formListener()
        Calendar.ToggleCalendar()
        Controller.searchListener()
    }
    static createType(type){
        let t = new Type(type.id,type.name)
    }
    static createTypes(types){
        types.forEach(Controller.createType);
    }
    static loadTypesAndHandleNotes(notes){
        Adapter.fetchTypes().then(types => {
            //set types not based on notes
            Controller.createTypes(types);
            Controller.createAndRenderNotes(notes);
        })
    }


// Mon, 01 Jan -4712 default day
    static createDay(day){
        let d = new Day(day.id, day.name, day.date)
    }
    static createDaysFromNotes(notes){

        notes.forEach(function(note) {
            Controller.createDay(note.day);
        });


    }

    static createNote(note) {
        let n = new Note(note.day_id, note.name, note.description, note.id,note.type_id)
        if(n.day_id != 1){
            //make calendar date
        }
    }

    static EditNote(note) {
        Calendar.all.notes.find(function(element) {
            if (element.id == note.id) {
                element.name = note.name
                element.type = note.type
                element.description = note.description
                element.day_id = note.day_id
            }
            // put rest - day id type id etc
            // debugger
        })
    }

    static createNotes(notes) {
        notes.forEach(function(note) {
            Controller.createNote(note);
        });
    }
    static createAndRenderNotes(notes) {

        Controller.createNotes(notes);
        Controller.renderNotes(Calendar.all.notes);
    }

    static renderNote(note) {
        let container = $('#lobby-container')
        let row = $('#lobby-row')
        let noteDiv = $('<div class="col-md-2"></div>')
        noteDiv.id = `note-${note.id}`
        noteDiv.html(note.render());
        row.append(noteDiv);
        // edit listener
        $(`#edit-${note.id}`).click(function(event) {
            NoteForm.EditForm(note)
        })
        $(`#delete-${note.id}`).click(function(event) {
            this.parentElement.parentElement.remove()
            Adapter.DeleteNote(note)
        })
    }
    static renderNotes(notes) {
        let container = $('#lobby-container')
        let row = $('#lobby-row')
        row.html('')
        notes.forEach(Controller.renderNote)
    }

    static hideForm() {
        let noteForm = $("#note-form")[0];
        noteForm.css = ("display", "none")
    }

    static formListener() {
        $('#add-a-note-button').click(function(event) {
          NoteForm.RenderForm()
          NoteForm.SubmitNewListener()
            })
    }
    static searchListener(){
      let searchInput = $('#search-input')
      searchInput.keyup(function(event){
        let row = $('#lobby-row')
        let searchTerm = $('#search-input').val().toLowerCase()
        if (event.key == "Backspace"){
          Controller.renderNotes(Calendar.all.notes.filter(note => note.name.includes(searchTerm)))
        }
        else if (searchTerm !== ''){
          row.html('')
          Controller.renderNotes(Calendar.all.notes.filter(note => note.name.includes(searchTerm)))
        }

        // else if

      })
    }

    // static formDate() {
    //     $('#myDate')[0].value = moment().format('YYYY-MM-DD')
    // }

}
