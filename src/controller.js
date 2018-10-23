


class Controller {

    static init(){

        // on page load
        Adapter.fetchNotes()
        .then(json => Controller.renderNotes(json))



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



}
