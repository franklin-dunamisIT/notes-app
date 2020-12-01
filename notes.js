const fs =  require('fs')
const chalk = require('chalk')

 
const addNote =  (title, body)=>{
    const notes =  loadNotes()
    const duplicateNotes = notes.find( (note) => 
         note.title === title
    )
    
    // const duplicateNotes = notes.filter( function(note){
    //     return note.title === title
    // }
    //)
    // if not dup found then add since it's unique
    console.log (duplicateNotes)
    if (! duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        const successMessage = chalk.green.bold('Note added!')
        console.log(successMessage)
    }else{
        const failureMessage = chalk.red.bold('Note not added! Pick a different title')
        console.log(failureMessage)

    }
}

const saveNotes = (notes) => {
    const dataJSON  =  JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = () => {
    try {
        const  dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e){
        return []
    } 
}

const removeNote = (title) => {
    const notes =  loadNotes()
    try{
        const notesAfterRemove =  notes.filter( (note) =>note.title !== title
        )
        
        console.log(JSON.stringify(notesAfterRemove))
        
        // if length of notes before and after remove aren't same, then something got removed
        if (notesAfterRemove.length !== notes.length){
            const successMessage= chalk.green.bold('Note Removed!')
            console.log(successMessage)
            saveNotes(notesAfterRemove)
        }else {
            const failureMessage= chalk.red.bold('Note not found!')
            console.log(failureMessage)
        }

    }catch (e){
        console.log('Error while removing note \'%s\'', title)
    }
}

const listNotes = () => {
    const notes =  loadNotes()
    const listNotesHeader = chalk.green('Your notes...')
    console.log(listNotesHeader)
    notes.forEach((note) => console.log(note.title))

}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => title === note.title)
    // breakpoint : activate by running node inspect app.js <op> [op param]
    //debugger
    try{
        if (noteToRead){
            const title =  chalk.green.italic(noteToRead.title)
            const note = chalk.green(noteToRead.body)

            console.log(title+'\n'+note)
        }else{
            const errorMessage = chalk.red.inverse('Note not found!')
            console.log(errorMessage)

        }
    } catch (e){
        console.log(e)
    }
} 

module.exports  = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

}