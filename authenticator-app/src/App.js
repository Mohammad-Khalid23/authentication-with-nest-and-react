import logo from './logo.svg'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { Routes, Route } from "react-router-dom";
const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>

      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;
