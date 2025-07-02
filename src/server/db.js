const SQLite = require('better-sqlite3')

const db = new SQLite('database.db')

// NOTE: We only ever create one student for testing purposes.
db.exec(`
CREATE TABLE IF NOT EXISTS  student (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
)`)

db.exec(`
CREATE TABLE IF NOT EXISTS tutor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
)`)

db.exec(`
CREATE TABLE IF NOT EXISTS booking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tutor_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  
  FOREIGN KEY(tutor_id) REFERENCES tutor(id),
  FOREIGN KEY(student_id) REFERENCES student(id)
)`)


db.exec(`
CREATE TABLE IF NOT EXISTS tutor_slot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tutor_id INTEGER NOT NULL,
  booking_id INTEGER,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,

  FOREIGN KEY(tutor_id) REFERENCES tutor(id),
  FOREIGN KEY(booking_id) REFERENCES booking(id)
)`)

db.exec("INSERT OR IGNORE INTO student VALUES (1, 'Student 1')")
db.exec("INSERT OR IGNORE INTO tutor VALUES (1, 'Tutor 1'), (2, 'Tutor 2')")
db.exec("INSERT OR IGNORE INTO booking VALUES (1, 1, 1, 1751864400, 1751868000)")
db.exec(`INSERT OR IGNORE INTO tutor_slot VALUES
  (1, 1, NULL, 1751875200, 1751878800),
  (2, 1, NULL, 1751882400, 1751886000),
  (3, 1, 1, 1751864400, 1751868000),
  (4, 2, NULL, 1751875200, 1751878800),
  (5, 2, NULL, 1751882400, 1751886000),
  (6, 2, NULL, 1751864400, 1751868000)
`)

module.exports = db