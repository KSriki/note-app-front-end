
class Controller {

    static init(){
        // on page load
        Adapter.fetchNotes()
        .then(json => Controller.renderNotes(json))
        Controller.formListener()
        Calendar.ToggleCalendar()

    }
    static renderNotes(notes){
        let container = $('#note-container')
        notes.forEach(function(note){

            let n = new Note(note.day_id,note.name,note.description,note.id)
            let noteDiv = document.createElement("div")
            noteDiv.id =`note-${note.id}`
            noteDiv.innerHTML = n.render();
            container.append(noteDiv);


        });


    }
    static hideForm() {
      let noteForm = $("#note-form")[0];
      noteForm.css = ("display","none")
    }

    static formListener(){
      $('#add-a-note-button').click(function(event){
        NoteForm.RenderForm()
        Controller.formDate()
      })
    }

    static formDate(){
      $('#myDate')[0].value = moment().format('YYYY-MM-DD')
     }




}
