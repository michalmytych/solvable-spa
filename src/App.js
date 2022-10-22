import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Base from './components/layouts/Base';
import Home from './pages/Home';
import Solutions from './pages/Solutions/Solutions';
import Courses from './pages/Courses/Courses';
import Commit from './pages/Solutions/Commit';
import { isUserAuthenticated } from './features/auth';
import Login from './pages/Auth/Login';
import { useEffect, useState } from 'react';
import Problems from './pages/Problems/Problems';
import Pusher from 'pusher-js'
import { PusherProvider } from './providers/PusherProvider';

// @todo - Enable pusher logging - don't include this in production
Pusher.logToConsole = true

const pusher = new Pusher('d1bdabed3a3f56fe70ec', {
  cluster: 'eu',
  encrypted: true,
});

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (isUserAuthenticated()) {
      setAuthenticated(true)
    }
  }, [])

  let appRoutes = null;

  if (authenticated) {
    appRoutes = (
      <div className="App">
        <Routes>
          {/* @todo - authenticated should be in redux */}
          <Route path="/" element={<Base isUserLoggedIn={authenticated} />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="problems" element={<Problems />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="commit" element={<Commit />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </div>
    )
  } else {
    appRoutes = (
      <div className="App">
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/login" element={<Login onAuthSuccess={() => setAuthenticated(true)} />} />
          </Route>
        </Routes>
      </div>
    )
  }

  return (
    <PusherProvider instance={pusher}>
      {appRoutes}
    </PusherProvider>
  )
}

export default App;
