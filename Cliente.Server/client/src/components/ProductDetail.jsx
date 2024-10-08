// src/components/ProductDetail.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetail({ productId, onClose }) {
  const [product, setProduct] = useState(null);

  // Busca os detalhes do produto
  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:5000/api/products/${productId}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>Detalhes do Produto</h2>
      <p><strong>Nome:</strong> {product.name}</p>
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Preço:</strong> ${product.price}</p>
      <p><strong>Quantidade:</strong> {product.quantity}</p>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
}

export default ProductDetail;
