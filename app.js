const notes =  require('./notes.js');
const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs');
const { removeNotes } = require('./notes.js');
const { string } = require('yargs');

// out =  getNotes()
// //console.log(out)
// console.log(validator.isEmail('as@example.com'))
// console.log(validator.isURL('as@example.com'))

// const greenM= chalk.blue.inverse.bold('Success')
// console.log(greenM)
// const command = process.argv[2]

// if (command === 'add') {
//     console.log('Adding note!')
// }else if (command === 'remove'){
//     console.log('Removing note!')
// }

yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Enter note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)

    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Enter note title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }

})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler:   () =>{
        notes.listNotes()

    }
})

// Create read command
yargs.command({
    command: 'read',
    builder: {
        title: {
            demandOption: true,
            type: 'string',
            describe: 'Enter note title to remove',
        }
    },
    describe: 'Read a note',
    handler:  (argv) => {
        notes.readNote(argv.title)    
    }

})



yargs.parse()
