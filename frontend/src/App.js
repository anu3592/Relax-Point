
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Select from './components/Select';
import TopRated from './components/TopRated';
import Theatre from './components/Theatre';
import Footer from './components/Footer';
import Room from './components/Room';
import SocketProvider from './components/SocketProvider';
import RoomPage from './components/RoomPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Navbar/>
        <SocketProvider>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='select' element={<Select/>}/>
          <Route path='/topRated' element={<TopRated/>}/>
          <Route path='/theatre' element={<Theatre/>}/>
          <Route path='/room' element={<Room/>}/>
          <Route path='/room/:roomId' element={<RoomPage/>}/>
        </Routes>
        </SocketProvider>
        <Footer/>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
