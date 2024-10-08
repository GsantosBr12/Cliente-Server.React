// src/components/ProductList.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductDetail from './ProductDetail';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado para detalhes

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((err) => console.error(err));
  };

  const saveProduct = (product) => {
    const request = editingProduct ? axios.put : axios.post;
    const url = editingProduct ? `http://localhost:5000/api/products/${editingProduct}` : 'http://localhost:5000/api/products';

    request(url, product)
      .then((res) => {
        setProducts(editingProduct ? products.map((p) => (p.id === editingProduct ? res.data : p)) : [...products, res.data]);
        setEditingProduct(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ProductForm productId={editingProduct} onSubmit={saveProduct} />

      {selectedProduct && (
        <ProductDetail productId={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - Qty: {product.quantity}
            <button onClick={() => setEditingProduct(product.id)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => setSelectedProduct(product.id)}>Show Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
