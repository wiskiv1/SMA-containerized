"use client";
import type { Meta } from "@/src/types/SMA_networking";

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
  async function handleSale() {
    const req = await fetch("/api/admin/sale", {
      method: "POST",
      body: JSON.stringify({
        tri: tri,
        price: price,
      }),
    });
    const body = (await req.json()) as Meta;

    if (!body.success) {
      console.log("Failed to sell " + tri + ": " + body.message);
    }
  }

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
            <div className="variation">0%</div>
          </div>
        </div>
        <div className="add_sale" style={{ backgroundColor: color }}>
          0
        </div>
      </div>
    </div>
  );
}
