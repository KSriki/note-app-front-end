$(function(){
// on page load
hideForm()
formListener()
formDate()
})

function hideForm() {
  let noteForm = $("#note-form")[0];
  noteForm.style.visibility = "hidden"
}

function formListener(){
  let noteForm = $("#note-form")[0];
  $('#add-a-note-button').click(function(event){
    event.preventDefault()
    noteForm.style.visibility = "visible"
  })
}

function formDate(){
  $('#myDate')[0].value = moment().format('YYYY-MM-DD')
  }
