const titleElement = document.querySelector('#note-title')//input
const bodyElement = document.querySelector('#note-body')//text area
const removeElement = document.querySelector('#remove-note');//button
const dateElement = document.querySelector('#last-edited');//timestamp
const noteId = location.hash.substring(1)
let notes = getSavedNotes() 
let note = notes.find(function (note) {
    return note.id === noteId
})

if (note === undefined) {
    location.assign('/index.html')
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', function(e) {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', function (e) {
    note.body = e.target.value;
    saveNotes(notes)
})

removeElement.addEventListener('click', function (e) {
    removeNote(note.id);
    getSavedNotes(notes);
    location.assign('/index.html')
})

window.addEventListener('storage', function (e) { //access local storage
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(function (note) {
            return note.id === noteId
        })
        if (note === undefined) {
            this.location.assign('/index.html')
        }
        titleElement.value = note.title
        bodyElement.value = note.body
    }
})