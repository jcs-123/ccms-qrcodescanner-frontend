import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import GetData from './pages/Getdata';
import './App.css';
import Scanner from './pages/Scanner';

function App() {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="p-3 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-data" element={<GetData />} />
              <Route path="/qr-scanner" element={<Scanner/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
