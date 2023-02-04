import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components';
import { Dashboard, AddCA, EditCA, CAList, Profile, Login } from './pages';

function App() {
  return (
    <div className="App flex flex-row">
      <Router>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/addca" element={<AddCA />} />
          <Route path="/editca/:id" element={<EditCA />} />
          <Route path="/list" element={<CAList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
