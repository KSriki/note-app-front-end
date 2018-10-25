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
$('#exampleModal').modal('show')
        container.append(formDiv)
        NoteForm.cancelListener()
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

    static cancelListener(){
      $(".modal").on("hidden.bs.modal", function(e) {

          $("#name-input").val("");
          $("#add-description").val("");
          $('#add-note-form').off("submit")
          $('#add-a-note-button').off("click")
          Controller.formListener()
      });

      $('#cancel-form').click(function(e) {
          $('#exampleModal').modal('hide');
      })
    }
    static SubmitNewListener() {
        $('#add-note-form').submit(function(e) {
            // do something here
            e.preventDefault();
            // debugger;

            if ($("#name-input").val() && $("#add-description").val()) {



                let note = {
                    "name": $("#name-input").val(),
                    "description": $("#add-description").val(),
                }

                if($("#exampleSelect1")){
                    note.type_id = $('#type-menu').val();
                }
                else{
                    note.type_id = 1;
                }


                if($("#myDate") && $("#myDate").val() ){

                    let dString = $("#myDate").val();

                    let date = Calendar.findDay(dString);
                    //date already exists

                    if(date){
                        note.day_id = date.id;
                    }
                    else{
                        //post and make a new Date
                        let newDate = new Date(dString);
                        // debugger;
                        let day = {
                            name: Calendar.weekdays[newDate.getDay()],
                            date: newDate

                        }
                        //so sketch

                        Adapter.PostDay(day).then(newDay => {
                                console.log(newDay);

                                Controller.createDay(newDay);
                                note.day_id = newDay.id;
                                Adapter.fetchPostNotes(note).then(n =>
                                {
                                    Controller.createNote(n)
                                    Controller.renderNote(Calendar.all.notes[Calendar.all.notes.length - 1]);
                                    $('#exampleModal').modal('toggle');

                                });
                                // $('#add-note-form').off("submit");
                        });

                    }
                    // dString
                    // //find in database
                    // note.day_id =
                }
                else{
                    note.day_id = 1;

                    Adapter.fetchPostNotes(note)
                        // $('#add-note-form').off("submit");


                        Controller.createNote(note)

                        Controller.renderNote(Calendar.all.notes[Calendar.all.notes.length - 1]);
                        $('#exampleModal').modal('toggle');
                        //  $(this).on('submit', function (evt) {
                        //          evt.preventDefault();
                        // });
                        // $("input[type='submit']", this).attr('disabled', 'disabled');
                        // e.target.reset();
                        // $('#exampleModal').modal('toggle');
                }

            } else {
                alert("Please enter a name and description");
            }

        })
    }

    static EditForm(note) {
      NoteForm.RenderForm()
      $('#exampleModal').modal()

      let divContainer = $('#extra-features')
      let extraFeaturesArea = $('#extra-features-area')
      extraFeaturesArea.html('')

        if (note.dayId > 1) {
          extraFeaturesArea.append(`<div id="add-date-feature" class="form-group">
          <input type="date" id="myDate" value='${note.dayId}'>
              <button type="button" class="btn btn-primary btn-sm" name="delete-date-button" id="delete-date-button">x</button>
          </div>`)

          $('#myDate').val(note.getDay().date)
          $('#delete-date-button').click(function() {
              this.parentNode.remove()
          })
        }

      
        // this allows to pass the id through the submission and patch
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
            let row = $('#lobby-row')
            row.html('')
            Controller.EditNote(note)
            Controller.renderNotes(Calendar.all.notes)
            $('#exampleModal').modal('toggle');
;
        })
    }


    static RenderExtraFeatures() {
        let divContainer = $('#extra-features')
        let extraFeaturesArea = $('#extra-features-area')
        extraFeaturesArea.html('')
        divContainer.html('')
        divContainer.html('Add A Feature')
        let selectMenu = $('<select id= "features-menu"> </select>').appendTo(divContainer)
        let addFeature = $('<option>').attr('value', "add a Feature").attr('id', 'add-Feature').html('')
        let addDate = $('<option>').attr('value', "Add-Date").attr('id', 'add-Date').html('Add Date')
        let addType = $('<option>').attr('value', "Add-Type").attr('id', 'add-Type').html('Add Type')

        selectMenu.append(addFeature)
        selectMenu.append(addDate)
        selectMenu.append(addType)

        selectMenu.on('change', function(event) {
            let dateFeature = $('#add-date-feature')
            let typeFeature = $('#add-type-feature')
            if (extraFeaturesArea[0].contains(dateFeature[0])) {
                // do nothing
            } else if (event.target.value === "Add-Date") {
                extraFeaturesArea.append(` <div id="add-date-feature" class="form-group">
                <input type="date" id="myDate" value="">
                    <button type="button" class="btn btn-primary btn-sm" name="delete-date-button" id="delete-date-button">x</button>
                </div>`)
                $('#delete-date-button').click(function() {
                    this.parentNode.remove()
                })
            }
            if (extraFeaturesArea[0].contains(typeFeature[0])) {
                // do nothing
            } else if (event.target.value === "Add-Type") {

                extraFeaturesArea.append(`<div id="add-type-feature" class="form-group">
                    <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <label for="note-type">Type of Note</label>
                        <select id="type-menu" class="form-control" id="exampleSelect1">

                        </select>
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" name="delete-type-button" id="delete-type-button">x</button>
            </div>`)

                let typeMenu = $('#type-menu')
                Calendar.all.types.forEach(type => {
                let typeOption = $('<option>').attr('value', `${type.id}`).attr('id', `type-${type.name}`).html(type.name)
                  typeMenu.append(typeOption)
                })
                $('#delete-type-button').click(function() {
                    this.parentNode.remove()
                })
            }
        })

    }

}
