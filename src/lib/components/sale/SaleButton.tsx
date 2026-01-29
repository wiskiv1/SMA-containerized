"use client";
import type { Meta } from "@/src/types/SMA_networking";
import { useState, useEffect } from "react";

export default function SaleButton({
  tri,
  name,
  initial_price,
  price,
  color,
}: {
  tri: string;
  name: string;
  price: number;
  initial_price: number;
  color: string;
}) {
  const [sales, updateSales] = useState(0);

  async function handleSale() {
    const req = await fetch("/api/admin/sale", {
      method: "POST",
      body: JSON.stringify({
        tri: tri,
        price: price,
      }),
    });
    const body = (await req.json()) as Meta;
    updateSales(sales + 1);

    if (!body.success) {
      console.log("Failed to sell " + tri + ": " + body.message);
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      updateSales(0);
    }, 10000);

    return () => clearInterval(id);
  }, []);

  const variation = ((price - initial_price) / initial_price) * 100;
  const variationRounded = Math.round(variation);

  const variationClass =
    variation > 0 ? "variation positive" : variation < 0 ? "variation negative" : "variation neutral";

  return (
    <div id="JUP" className="drink" onClick={handleSale}>
      <div className="name">
        <span className="trigram">{tri}</span> - <span className="full_name">{name}</span>
      </div>
      <div className="infos">
        <div className="prices">
          <span className="actual_price">{price}€</span>
          <div>
            <div className="initial_price">{initial_price}€</div>
            <div className={variationClass}>{variationRounded}%</div>
          </div>
        </div>
        <div className="add_sale" style={{ backgroundColor: color }}>
          {sales}
        </div>
      </div>
    </div>
  );
}
