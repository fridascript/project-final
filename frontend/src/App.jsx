import {ThemeProvider } from "styled-components";
import { theme } from "./assets/theme";
import { GlobalStyles } from "./assets/GlobalStyles.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/home.jsx";
import { Login } from "./pages/login.jsx";
import { Register } from './pages/register.jsx';
import { ProductDetail } from "./pages/ProductDetail.jsx";
import { Gallery } from './pages/gallery.jsx';
//for logged in artist
import { Dashboard } from './pages/dashboard.jsx';
import { Messages } from './pages/messages.jsx';
import { PostItem } from './pages/PostItems.jsx';
import { Account } from './pages/account.jsx';


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
      <Route path="/gallery/:userId" element={<Gallery />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/post-item" element={<PostItem />} />
      <Route path="/account" element={<Account />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
