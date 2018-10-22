document.addEventListener("DOMContentLoaded",function(){

    fetchDays();
})

function renderDays(days){
    let dCon = document.getElementById("day");

    days.forEach(function(day){
        let li = document.createElement("li");

        li.innerHTML = day.name + ", " + day.date;
        dCon.appendChild(li);

        let notes = document.createElement("ol");
        day.notes.forEach(function(note){
            let nli = document.createElement("li");
            
            nli.innerHTML = note.name + ", " + note.description;
            notes.appendChild(nli);
        })
        dCon.appendChild(notes)
    });
}

function fetchDays(){

    const url = "http://localhost:3000/days";
    fetch(url)
    .then(resp => resp.json())
    .then(json => renderDays(json))


}
