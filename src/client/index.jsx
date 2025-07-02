import { h, Fragment, render } from 'preact'
import { LocationProvider, ErrorBoundary, Router, Route, useLocation } from 'preact-iso'

import NotFound from './_404.jsx'
import Tutors from './routes/home.jsx';
import TutorSlots from './routes/slots.jsx';

const App = () => (
  <LocationProvider>
    <ErrorBoundary>
      <Router>
        <Tutors path="/" />
        <TutorSlots path='/:tutorId/slots' />
        <NotFound default />
      </Router>
    </ErrorBoundary>
  </LocationProvider>
)

render(<App />, document.getElementById('app'));