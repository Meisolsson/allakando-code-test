const express = require('express')
const path = require('path')
const db = require('./db')

const app = express()
app.use(express.json())

app.get('/api/tutors', (req, res) => {
  const data = db.prepare('SELECT * FROM tutor').all()
  res.json(data)
})

app.get('/api/tutors/:id', (req, res) => {
  const data = db.prepare('SELECT * FROM tutor WHERE id=?').get(req.params.id)
  res.json(data)
})

app.get('/api/tutors/:id/slots', (req, res) => {
  const data = db.prepare('SELECT * FROM tutor_slot WHERE tutor_id=?').all(req.params.id)
  res.json(data)
})

app.post('/api/slots/:id/book', (req, res) => {
  const slot = db.prepare('SELECT * FROM tutor_slot WHERE id=?').get(req.params.id)
  if (slot.booking_id) {
    res.status(400).send("Slot already booked.")
    return 
  }
  const booking = db.prepare('INSERT INTO booking(tutor_id, student_id, start_time, end_time) VALUES(?, ?, ?, ?)').run(slot.tutor_id, req.body.student_id, slot.start_time, slot.end_time)
  db.prepare('UPDATE tutor_slot SET booking_id=? WHERE id=? ').run(booking.lastInsertRowid, slot.id)

  res.end()
})

app.use(express.static(path.resolve(__dirname, '../../dist')))
app.get('/{*splat}', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')))

const server = app.listen(3000, () => {
  console.log('Application listening on port 3000')
})

module.exports = {
 server,
 app
}