import {BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import AppRoutes from "./AppRoute.tsx";

function App() {


  return (
    <>
      <Router>
          <AppRoutes/>
      </Router>
    </>
  )
}

export default App
