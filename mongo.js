const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:fullstack@cluster0.r4oba.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    date: Date,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     // content: 'Mongoose makes things easy',
//     // important: true,
//     // date: new Date()
// })

// note.save().then(result => {
//     // console.log('note saved!')
//     // console.log(note)
//     // mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})