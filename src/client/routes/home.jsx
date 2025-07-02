import { h, Fragment } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export default function Tutors () {
  const [tutors, setTutors] = useState()

  useEffect(() => {
    fetch('/api/tutors')
      // TODO: Handle errors?
      .then(res => res.json())
      .then(data => setTutors(data))
  }, [])

  return (
    <div className='px-8 py-12 max-w-prose'>
      <h2 className='text-2xl font-medium'>Select your tutor:</h2>
      <div className='flex flex-col space-y-2 mt-6'>
        {tutors && tutors.map(t => (<TutorRow tutor={t} key={t.id}/>))}
      </div>
    </div>
  )
}

const TutorRow = ({ tutor }) => (
  <a className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer' href={`${tutor.id}/slots`}>
    <p className='text-xl'>{tutor.name}</p>
  </a>
)