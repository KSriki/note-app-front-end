class Controller {

    static init() {
        // on page load
        Adapter.fetchNotes().then(json => Controller.createAndRenderNotes(json))
        Controller.formListener()
        Calendar.ToggleCalendar()

    }

    static createNote(note) {
        let n = new Note(note.day_id, note.name, note.description, note.id)
    }

    static EditNote(note) {
        Calendar.all.notes.find(function(element) {
            if (element.id == note.id) {
                element.name = note.name
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
        // let container = $('#lobby-container')
        // container.html('')
        // notes.forEach(function(note){
        //      debugger;
        //     let n = new Note(note.day_id,note.name,note.description,note.id)
        //     let noteDiv = document.createElement("div")
        //     noteDiv.id =`note-${note.id}`
        //     noteDiv.innerHTML = n.render();
        //     container.append(noteDiv);
        // });
        Controller.createNotes(notes);
        Controller.renderNotes(Calendar.all.notes);
    }

    static renderNote(note) {
        let container = $('#lobby-container')
        let noteDiv = document.createElement("div")
        noteDiv.id = `note-${note.id}`
        noteDiv.innerHTML = note.render();
        container.append(noteDiv);
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
        container.html('')
        notes.forEach(Controller.renderNote)
    }

    static hideForm() {
        let noteForm = $("#note-form")[0];
        noteForm.css = ("display", "none")
    }

    static formListener() {
        $('#add-a-note-button').click(function(event) {
            NoteForm.RenderForm()
            // Controller.formDate()
            NoteForm.SubmitNew()
        })
    }

    // static formDate() {
    //     $('#myDate')[0].value = moment().format('YYYY-MM-DD')
    // }

}
