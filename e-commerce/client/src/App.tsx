import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Cart from "./components/Cart";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product/:id" element={<ProductPage />}/>
        <Route path="/cart" element={<Cart />}/>
      </Routes>
    </Router>
  )
};

export default App;
