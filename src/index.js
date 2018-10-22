document.addEventListener("DOMContentLoaded",function(){


    fetchNotes();
})

function renderNotes(notes){
    let days = document.getElementById("day")
}

function fetchNotes(){

    const url = "https://localhost:3000/notes";
    fetch(url)
    .then(resp => resp.json())
    .then(json => renderNotes(json))


}
