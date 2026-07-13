import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContext } from "./pages/context/context";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  </ThemeProvider>
);