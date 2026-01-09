"use client";
/**
 * @author Witse Panneels
 */
import type { Product } from "@/src/types/SMA_objects";
import type { productsResponse } from "@/src/types/SMA_networking";
import { useEffect, useState } from "react";

export default function ProductSettings() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/getAllProducts");
      const body = (await res.json()) as productsResponse;
      setProducts(body.products);
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products…</p>;
  }

  return (
    <table className="products-table">
      <thead className="products-table-head">
        <tr>
          <th colSpan={2}>Product</th>
          <th colSpan={4}>Prices</th>
          <th colSpan={2}>Actions</th>
        </tr>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.tri} className="product-table-row">
            <td>{p.tri}</td>
            <td>{p.name}</td>
            <td>{p.defaultPrice}</td>
            <td>{p.crashPrice}</td>
            <td>{p.minPrice}</td>
            <td>{p.maxPrice}</td>
            <td>edit</td>
            <td>del</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
