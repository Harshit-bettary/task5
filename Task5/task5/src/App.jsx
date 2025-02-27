import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Modal from './components/Modal';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setAlert("Item already in cart");
      setTimeout(() => setAlert(""), 2000);
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  return (
    <div>
      <Navbar cartCount={cart.length} onCartClick={() => setModalOpen(true)} />
      {alert && <div className="alert">{alert}</div>}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-img" />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)} className="add-btn">Add to Cart</button>
          </div>
        ))}
      </div>
      {modalOpen && <Modal cart={cart} onClose={() => setModalOpen(false)} removeFromCart={removeFromCart} />}
    </div>
  );
};

export default App;
