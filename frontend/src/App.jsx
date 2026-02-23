import {ThemeProvider } from "styled-components";
import { theme } from "./assets/theme";
import { GlobalStyles } from "./assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/home.jsx";
import { Login } from "./pages/login.jsx";
import { Register } from './pages/register.jsx';
import { ProductDetail } from "./pages/ProductDetail.jsx";
//for logged in artist
import { Dashboard } from './pages/dashboard.jsx';
import { Messages } from './pages/messages.jsx';


export const App = () => {

  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="product/:id" element={<ProductDetail /> } />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messages" element={<Messages />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
