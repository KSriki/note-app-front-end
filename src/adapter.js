class Adapter {

    static fetchNotes(){

        const url = "http://localhost:3000/notes";
        return fetch(url)
        .then(resp => resp.json())


    }



}
