import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Spinner from '../spinner'

const dateTimeFormat = Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })

export default function TutorSlots ({ tutorId }) {
  const [slots, setSlots] = useState()
  const [tutor, setTutor] = useState()

  useEffect(() => {
    refreshSlots()
  }, [])

  function refreshSlots() {
    fetch(`/api/tutors/${tutorId}`)
      // TODO: Handle errors?
      .then(res => res.json())
      .then(data => setTutor(data))
    fetch(`/api/tutors/${tutorId}/slots`)
      // TODO: Handle errors?
      .then(res => res.json())
      .then(data => setSlots(data))
  }

  return (
    <div className='px-8 py-12 max-w-prose'>
      <h2 className='text-2xl font-medium'>Time slots:</h2>
      <div className='flex flex-col space-y-2 mt-6'>
        {(slots && tutor) && slots.map(s => (<SlotRow slot={s} tutor={tutor} refreshSlots={refreshSlots} key={s.id} />))}
      </div>
    </div>
  )
}

export const SlotRow = ({ slot, tutor, refreshSlots }) => {
  const [isBooking, setIsBooking] = useState(false)

  async function onSlotClicked () {
    if (isBooking) {
      return
    }

    setIsBooking(true)
    fetch(`/api/slots/${slot.id}/book`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ student_id: 1 })
    }).then(res => {
      if (!res.ok) {
        // TODO: Show toast
        res.text().then(error => {
          alert(error)
        })
        setIsBooking(false)
        return
      }
      refreshSlots()
      setIsBooking(false)
    })
  }

  return (
    <div className={`flex flex-row items-center rounded-lg px-4 py-2 ${!slot.booking_id ? 'bg-gray-100' : 'bg-red-500 cursor-default'}`}>
      <div>
        <p className='text-xl font-bold'>{tutor.name}</p>
        <p className='text-xl'>{dateTimeFormat.formatRange(slot.start_time * 1000, slot.end_time * 1000)}</p>
      </div>
      {
        !slot.booking_id
          ? (<button className='bg-blue-500 text-white px-4 py-2 ml-auto rounded-xl cursor-pointer hover:bg-blue-400 active:bg-blue-600 font-medium uppercase' onClick={onSlotClicked}>{isBooking ? <Spinner /> : 'Book'}</button>)
          : (<p className='px-4 py-2 ml-auto uppercase font-medium'>Booked</p>)
      }
    </div>
  )
}