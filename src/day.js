class Day {
    constructor(id,name,date){
        this.id = id;
        this.name = name;
        this.date = date;
        Calendar.all.days.push(this);
    }

    notes(){
        return calendar.notes.filter(note => {
            return note.dayId == this.id;
        });
    }
}
