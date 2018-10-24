class NoteForm {
  static RenderForm(){
    let container = $('#lobby-container')
    container.html('')
    let formDiv = $('<div>')
    formDiv.html(`<div id="note-form" class="row">
        <div class="col-3"></div>
        <div class="col-6 text-center">
          <div class="bs-component">
            <form>
            <fieldset>
            <legend id="legend">ADD A NOTE</legend>
            <div class="form-group">
            <label for="note-name" class="col-12 col-form-label">Name of Note</label>
            <input class="col-6"type="note-name-input" class="form-control" id="name-input" placeholder="Enter A Name For This Note">
            </div>
            <div class="form-group">
            <label for="note-description" class="col-12 col-form-label">Note Description</label>
            <textarea rows="4" cols="50">
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


  }
}
