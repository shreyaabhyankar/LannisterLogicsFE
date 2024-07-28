import './App.css';
import StartUp from './components/Platform/StartUp'
import Register from './components/LendStreet/Register';
import { MainRoutes } from './Routes/MainRoutes';
import {Router} from "react-router-dom";

function App() {
  return (
    <>
      <MainRoutes />
    </>
    
  );
}

export default App;
