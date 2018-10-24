
class Note {
    constructor(day_id,name,description,id){
        this.dayId = day_id;
        this.id = id;
        this.name = name;
        this.description = description;
        Calendar.all.notes.push(this);
    }

    render(){
        let card = `
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
            <div class="card-body">
                <h4 class="card-title">${this.name}</h4>
                <p class="card-text" data-id="${this.id}">${this.description}</p>
                <button id="edit-${this.id}" data-id="${this.id}" data-desc="${this.description}" data-name="${this.name}"> Edit Note </button>
            </div>
        </div>`
        //add listener for the edit button in controller
        return card;
    }
}
