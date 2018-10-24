class NoteForm {
  static RenderForm(){
    let container = $('#lobby-container')
    container.html('')
    let formDiv = $('<div>')
    formDiv.html(`<div id="note-form" class="row">
        <div class="col-3"></div>
        <div class="col-6 text-center">
          <div class="bs-component">
            <form id="add-note-form">
            <fieldset>
            <legend id="legend">ADD A NOTE</legend>
            <div class="form-group">
            <label for="note-name" class="col-12 col-form-label">Name of Note</label>
            <input class="col-6" type="note-name-input" class="form-control" name="name-input" id="name-input" placeholder="Enter A Name For This Note">
            </div>
            <div class="form-group">
            <label for="note-description" class="col-12 col-form-label">Note Description</label>
            <textarea rows="4" cols="50" id="add-description">
            </textarea>
            </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-3">
                  </div>
                  <div class="col-6">
                    <label for="note-type">Type of Note</label>
                    <select class="form-control" id="exampleSelect1">
                    <option>add all types with javascript</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </select>
                  </div>
                </div>
              </div>

            <div id="calendar-container" class="form-group">
              <input type="date" id="myDate" value="">
            </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
            </form>
          </div>
        </div>
    </div>`)
    container.append(formDiv)
    let cancelButton = $('<button/>', {
      type: 'button',
      id:'cancelButton',
      html: "X",
      class: 'btn btn-outline-primary btn-sm'
    })
    $('#legend').append(cancelButton)
    cancelButton.click(function(){
      container.html('')
      Controller.renderNotes(Calendar.all.notes);
    })

  }
  static SubmitNew(){
    $("#add-note-form").submit(function(event){
        event.preventDefault();
        let note = {
            "name": $("#name-input").val(),
            "description": $("#add-description").val(),
            "day_id": 2,
            "type_id": 1
            //make it so u permit but dont require day/type
        }
        Adapter.fetchPostNotes(note);
        let container = $('#lobby-container')
        container.html('')
        Controller.createNote(note)
        Controller.renderNotes(Calendar.all.notes);
    })
  }


  static EditForm(note){
    NoteForm.RenderForm()
    //this allows to pass the id through the submission and patch
    $("#add-note-form").attr("data-id", note.id)
    //have input values already rendered in inputs to edit
    $('#name-input').val(note.name)
    $('#add-description').val(note.description)
    // add day/date/other inputs if applicable (type etc)
    $("#add-note-form").submit(function (event){
        event.preventDefault();
        let id = $("#add-note-form").attr("data-id")
        let note = {
            "id" : id,
            "name": $("#name-input").val(),
            "description": $("#add-description").val(),
            "day_id": 2,
            "type_id": 1
        }
        Adapter.PatchNote(note)
        let container = $('#lobby-container')
        container.html('')
        Controller.EditNote(note)
        Controller.renderNotes(Calendar.all.notes);
    })
  }

  



}
