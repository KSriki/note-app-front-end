class NoteForm {
  static Render(){
    let container = $('#lobby-container')
    container.html('')
    let formDiv = $('<div>')
    formDiv.html(`<div id="note-form" class="row">
        <div class="col-3"></div>
        <div class="col-6 text-center">
          <div class="bs-component">
            <form>
            <fieldset>
            <legend>ADD A NOTE</legend>
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

            <div class="form-group">
            <label for="exampleTextarea">Example textarea</label>
            <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
            </div>
            <div class="form-group">
            <label for="exampleInputFile">File input</label>
            <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
            <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
            </div>
            <fieldset class="form-group">
            <legend>Radio buttons</legend>
            <div class="form-check">
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
            Option one is this and that—be sure to include why it's great
            </label>
            </div>
            <div class="form-check">
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
            Option two can be something else and selecting it will deselect option one
            </label>
            </div>
            <div class="form-check disabled">
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled="">
            Option three is disabled
            </label>
            </div>
            </fieldset>
            <fieldset class="form-group">
            <legend>Checkboxes</legend>
            <div class="form-check">
            <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="" checked="">
            Option one is this and that—be sure to include why it's great
            </label>
            </div>
            <div class="form-check disabled">
            <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="" disabled="">
            Option two is disabled
            </label>
            </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
            </form>
          </div>
        </div>
    </div>`)
    container.append(formDiv)
  }
static RenderAllNotes(){
  let container = $('#lobby-container')
  container.html('')
  let allNotesDiv = $('<div>')
  allNotesDiv.addClass("fluid-container")
  }
}
