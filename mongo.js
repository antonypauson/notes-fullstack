require('dotenv').config()

const mongoose = require('mongoose')

if (!process.env.MONGODB_PASSWORD) {
    console.log('Password is missing in environment variable')
    process.exit(1)
}

const password = process.env.MONGODB_PASSWORD

const url = `mongodb+srv://fullstack:${password}@cluster0.r4oba.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

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