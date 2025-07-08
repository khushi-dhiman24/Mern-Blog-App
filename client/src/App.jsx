import "./App.css";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import GlobalProvider from "./context";
import Home from "./pages/home";
import AddNewBlog from "./pages/add-blog";

function App() {
  return (
    <div>
        <GlobalProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddNewBlog />} />
      </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;