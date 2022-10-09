import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Base from './components/layouts/Base';
import Home from './pages/Home';
import Solutions from './pages/Solutions/Solutions';
import Commit from './pages/Solutions/Commit';
import { isUserAuthenticated } from './features/auth';
import Login from './pages/Auth/Login';
import { useEffect, useState } from 'react';
import Problems from './pages/Solutions/Problems';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (isUserAuthenticated()) {
      setAuthenticated(true)
    }
  }, [])

  if (authenticated) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Base isUserLoggedIn={authenticated}/>}>
            <Route path="home" element={<Problems />} />
            <Route path="problems" element={<Problems />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="commit" element={<Commit />} />
            {/* todo */}
            <Route path="*" element={<Navigate to="/home" />} />
            <Route index element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/login" element={<Login onAuthSuccess={() => setAuthenticated(true)}/>} />
            {/* todo */}
            <Route index element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </div>
    )
  }
}

export default App;
