import './App.css';
import Series from './components/series/Series';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Show from './components/singleseries/show';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <h1>Maze TV Shows</h1>
        </header>
        <Routes>
          <Route path='/' element={<Series />} />
        </Routes>
        <Routes>
          <Route path='/show/:id' element={<Show />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
