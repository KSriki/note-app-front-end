class Adapter {

    static fetchNotes(){

        const url = "http://localhost:3000/notes";
        return fetch(url)
        .then(resp => resp.json())


    }

    static fetchPostNotes(note){
        const url = "http://localhost:3000/notes";
        return fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(resp => resp.json())

    }

    static PatchNote(note){
      
      const url = `http://localhost:3000/notes/${note.id}`
      return fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(note)
      })
      .then(resp => resp.json())
    }

    static DeleteNote(note){
      const url = `http://localhost:3000/notes/${note.id}`
      return fetch(url, {
        method: "DELETE"
      })
    }

    static PostDay(day){
        const url = "http://localhost:3000/days";
        return fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(day)
        })
        .then(resp => resp.json())
    }

    static fetchTypes(){

        const url = "http://localhost:3000/types";
        return fetch(url)
        .then(resp => resp.json())


    }
}
