class NoteForm {
    static RenderForm() {
        let container = $('#lobby-container')

        let formDiv = $('<div>')
        formDiv.html(`<div id="note-form" class="row">
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"> <legend id="legend">ADD A NOTE</legend></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

                  <div class="col-3"></div>
                  <div class="col-6 text-center">
                    <div class="bs-component">
                      <form id="add-note-form">
                      <fieldset>

                      <div class="form-group">
                      <label for="note-name" class="col-12 col-form-label">Name of Note</label>
                      <input class="col-6" type="note-name-input" class="form-control" name="name-input" id="name-input" placeholder="Enter A Name For This Note">
                      </div>
                      <div class="form-group">
                      <label for="note-description" class="col-12 col-form-label">Note Description</label>
                      <textarea rows="4" cols="50" id="add-description"></textarea>
                      </div>
                          <div id="extra-features-area">




                          </div>
                          <div id="extra-features">




                          </div>
                      <input type="submit" class="btn btn-primary" id="submit-note">
                      <button type="button" class="btn btn-secondary" id="cancel-form">Cancel</button>
                      </form>
                    </div>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </div>
`)
        container.append(formDiv)
        NoteForm.RenderExtraFeatures()

        // let cancelButton = $('<button/>', {
        //     type: 'button',
        //     id: 'cancelButton',
        //     html: "X",
        //     class: 'btn btn-outline-primary btn-sm'
        // })
        // $('#legend').append(cancelButton)
        // cancelButton.click(function(){
        //   container.html('')
        //   Controller.renderNotes(Calendar.all.notes);
        // })
    }
    static SubmitNew() {
        // debugger;

        $('#cancel-form').click(function(){
            // debugger;
            $("#name-input").val("");
            $("#add-description").val("");
            $('#exampleModal').modal('toggle');
        })


        $('#add-note-form').one('submit', function (e) {

    // do something here
            e.preventDefault();
            // debugger;
            // debugger;


                if(!$("#name-input").val() || !$("#add-description").val()){
                    alert("Please enter a name and description");
                    return;
                }
            let note = {
                "name": $("#name-input").val(),
                "description": $("#add-description").val(),
                "day_id": 2
            }
            Adapter.fetchPostNotes(note).then(function(note){

                Controller.createNote(note)
                // debugger;
                Controller.renderNote(Calendar.all.notes[Calendar.all.notes.length-1]);
                debugger;
               //
               //  $(this).on('submit', function (evt) {
               //          evt.preventDefault();
               // });
               // $("input[type='submit']", this).attr('disabled', 'disabled');
               e.target.reset();
               $('#exampleModal').modal('toggle');
            });
        })
    }

    static EditForm(note) {
        NoteForm.RenderForm()
        //this allows to pass the id through the submission and patch
        $("#add-note-form").attr("data-id", note.id)
        //have input values already rendered in inputs to edit
        $('#name-input').val(note.name)
        $('#add-description').val(note.description)
        // add day/date/other inputs if applicable (type etc)
        $("#add-note-form").submit(function(event) {
            event.preventDefault();
            let id = $("#add-note-form").attr("data-id")
            let note = {
                "id": id,
                "name": $("#name-input").val(),
                "description": $("#add-description").val(),
                "day_id": 2,
                "type_id": 1
            }
            Adapter.PatchNote(note)
            //only change the note we want to change
            let container = $('#lobby-container')
            container.html('')
            Controller.EditNote(note)
            Controller.renderNotes(Calendar.all.notes);
        })
    }

    static RenderExtraFeatures(){
      let divContainer = $('#extra-features')
      let extraFeaturesArea = $('#extra-features-area')
      divContainer.html('')
      let selectMenu = $('<select id= "features-menu"></select>').appendTo(divContainer)
      let addFeature = $('<option>').attr('value', "add a Feature").attr('id', 'add-Feature').html('Add a Feature')
      let addDate = $('<option>').attr('value', "Add-Date").attr('id', 'add-Date').html('Add Date')
      let addType = $('<option>').attr('value', "Add-Type").attr('id', 'add-Type').html('Add Type')

      selectMenu.append(addFeature)
      selectMenu.append(addDate)
      selectMenu.append(addType)

      selectMenu.on('change', function(event){
        if (extraFeaturesArea[0].contains($('#calendar-container')) == true){
          debugger
        }
        else if (event.target.value === "Add-Date"){
          extraFeaturesArea.append(`<div id="calendar-container" class="form-group">
              <input type="date" id="myDate" value="">
            </div>`)
          }
        else if (event.target.value === "Add-Type"){
          extraFeaturesArea.append(`<div class="form-group">
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
          </div>`)
        }
        debugger
      })
    }
}
