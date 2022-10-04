import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Base from './components/layouts/Base';
import Home from './pages/Home';
import NoMatch from './pages/Errors/NoMatch';
import Solutions from './pages/Solutions/Solutions';
import Commit from './pages/Solutions/Commit';
import { login } from './features/auth';

const App = () => {
  useEffect(() => {
    if (!window.localStorage.getItem('API_TOKEN')) {
      login()
    }
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="commit" element={<Commit />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
