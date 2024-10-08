import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ productId, onSubmit }) {
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:5000/api/products/${productId}`).then((res) => {
        setProduct(res.data);
      });
    }
  }, [productId]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={product.name} onChange={handleChange} placeholder="Name" />
      <input name="description" value={product.description} onChange={handleChange} placeholder="Description" />
      <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" />
      <input name="quantity" type="number" value={product.quantity} onChange={handleChange} placeholder="Quantity" />
      <button type="submit">{productId ? 'Update' : 'Add'} Product</button>
    </form>
  );
}

export default ProductForm;
