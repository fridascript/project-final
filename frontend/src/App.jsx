import {ThemeProvider } from "styled-components";
import { theme } from "./assets/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/home.jsx";
import { GlobalStyles } from "./assets/GlobalStyles.js";
export const App = () => {

  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
