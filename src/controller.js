
class Controller {

    static init(){

        // on page load
        Adapter.fetchNotes()
        .then(json => Controller.renderNotes(json))

        Controller.hideForm()
        Controller.formListener()
        Controller.formDate()


    }

    static renderNotes(notes){
        let container = $('#note-container')
        debugger;
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
      noteForm.style.visibility = "hidden"
    }

    static formListener(){
      let noteForm = $("#note-form")[0];
      $('#add-a-note-button').click(function(event){
        event.preventDefault()
        noteForm.style.visibility = "visible"
      })
    }

    static formDate(){
      $('#myDate')[0].value = moment().format('YYYY-MM-DD')
     }




}
