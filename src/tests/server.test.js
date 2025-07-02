import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

const request = require("supertest");
const {server, app} = require("../server/index");

afterAll(() => {
  return server.close()
});

test('fail booking a booked session', () => {
  // NOTE: This is a default data point which is already booked.
  return request(app)
    .post('/api/slots/3/book')
    .send({ student_id: 1})
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.statusCode).toBe(400);
    });
});