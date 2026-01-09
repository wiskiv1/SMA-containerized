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

  //TODO handle Edit
  async function handleEdit(tri: string) {
    const row = document.getElementById(tri) as HTMLTableRowElement;
    const inputs = row.querySelectorAll("input");

    const product: Product = {
      tri: tri,
      name: inputs[0].value,
      defaultPrice: Number(inputs[1].value),
      crashPrice: Number(inputs[2].value),
    };
    if (inputs[3].value !== "") product.minPrice = Number(inputs[4].value);
    if (inputs[4].value !== "") product.maxPrice = Number(inputs[5].value);

    const req = await fetch("/api/admin/product", {
      method: "PATCH",
      body: JSON.stringify(product),
    });
    const response = await req.json();

    if (!response.success) {
      alert(response.message ?? "Failed to edit product");
    }
  }

  //TODO handle Delete
  async function handleDelete(trigram: string) {
    const row = document.getElementById(trigram) as HTMLTableRowElement;
    const inputs = row.querySelectorAll("input");

    const confirmed = window.confirm(`Are you sure you want to delete product "${inputs[0].value}"?`);

    if (!confirmed) return;

    const req = await fetch("/api/admin/product", {
      method: "DELETE",
      body: JSON.stringify({ tri: trigram }),
    });
    const response = await req.json();

    if (response.success) {
      setProducts((prev) => prev.filter((p) => p.tri !== trigram));
    } else {
      alert(response.message ?? "Failed to edit product");
    }
  }

  async function handleAdd() {
    const row = document.getElementById("newProduct") as HTMLTableRowElement;
    const inputs = row.querySelectorAll("input");

    const product: Product = {
      tri: inputs[0].value,
      name: inputs[1].value,
      defaultPrice: Number(inputs[2].value),
      crashPrice: Number(inputs[3].value),
    };
    if (inputs[4].value !== "") product.minPrice = Number(inputs[4].value);
    if (inputs[5].value !== "") product.maxPrice = Number(inputs[5].value);

    const req = await fetch("/api/admin/product", {
      method: "POST",
      body: JSON.stringify(product),
    });
    const response = await req.json();

    if (response.success) {
      // product toevoegen en inputs clearen
      setProducts((prev) => [...prev, product]);
      inputs.forEach((input) => {
        if (input.type !== "button") {
          input.value = "";
        }
      });
    } else {
      alert(response.message ?? "Failed to add product");
    }
  }

  function handleClear() {
    const row = document.getElementById("newProduct") as HTMLTableRowElement;
    const inputs = row.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.type !== "button") {
        input.value = "";
      }
    });
  }

  if (loading) {
    return <p>Loading products…</p>;
  }

  return (
    <table className="products-table">
      <thead className="products-table-head">
        <tr>
          <th colSpan={2}>Product</th>
          <th colSpan={4}>Prices</th>
          <th colSpan={2}></th>
        </tr>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.tri} id={p.tri} className="product-table-row">
            <td className="product-tri">{p.tri}</td>
            <td>
              <input type="text" id="Fn" className="product-input-name" defaultValue={p.name} />
            </td>
            <td>
              <input type="number" id="Dprice" className="product-input-price" defaultValue={p.defaultPrice} />
            </td>
            <td>
              <input type="number" id="Cprice" className="product-input-price" defaultValue={p.crashPrice} />
            </td>
            <td>
              <input type="number" id="MINprice" className="product-input-price" defaultValue={p.minPrice} />
            </td>
            <td>
              <input type="number" id="MAXprice" className="product-input-price" defaultValue={p.maxPrice} />
            </td>
            <td>
              <input
                type="button"
                id="Save"
                className="product-input-button"
                value="edit"
                onClick={() => {
                  handleEdit(p.tri);
                }}
              />
            </td>
            <td>
              <input
                type="button"
                id="Del"
                className="product-input-button"
                value="delete"
                onClick={() => {
                  handleDelete(p.tri);
                }}
              />
            </td>
          </tr>
        ))}
        <tr id="newProduct" className="product-table-row">
          <td>
            <input type="text" id="Fn" className="product-input-tri" placeholder="TRI" />
          </td>
          <td>
            <input type="text" id="Fn" className="product-input-name" placeholder="Full Name" />
          </td>
          <td>
            <input type="number" id="Dprice" className="product-input-price" placeholder="2,5" />
          </td>
          <td>
            <input type="number" id="Cprice" className="product-input-price" placeholder="1" />
          </td>
          <td>
            <input type="number" id="MINprice" className="product-input-price" placeholder="1" />
          </td>
          <td>
            <input type="number" id="MAXprice" className="product-input-price" placeholder="8" />
          </td>
          <td>
            <input type="button" id="Save" className="product-input-button" value="add" onClick={handleAdd} />
          </td>
          <td>
            <input type="button" id="Del" className="product-input-button" value="clear" onClick={handleClear} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
