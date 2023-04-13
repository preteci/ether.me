import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Search from './pages/Search'
import Balance from './pages/Balance'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/balance" element={<Balance/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
