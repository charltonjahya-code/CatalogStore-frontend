'use client';

import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  base_price: number;
};

export default function Home() {
  // 1. state to hold products (starts empty)
  const [products, setProducts] = useState<Product[]>([]);

  // 2. fetch products once when the page loads
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // 3. display the products
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}