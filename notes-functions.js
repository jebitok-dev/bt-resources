//Read existing notes from localstorage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes');

        if (notesJSON !== null) {
        return JSON.parse(notesJSON); //reassigning notes
    } else {
        return []
    }
}

//save notes to localstorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//remove a note from the list
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note){
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//Generate  the DOM structure for a note
const generateNoteDOM = function(note){ //function expression
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a');
    const button = document.createElement('button');

    //setup the remove button
    button.textContent = 'x';
    noteEl.appendChild(button);
    button.addEventListener('click', function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
    
    return noteEl; //return the 'p'
}

//Render application notes
const renderNotes = function (notes, filters) { 
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDOM(note);
        document.querySelector('#notes').appendChild(noteEl)
    })
}
//Generate the last edited message
const generateLastEdited = function (timestamp) {
    return `Last edited ${moment(timestamp).fromNow()}`
}