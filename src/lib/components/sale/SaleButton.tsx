"use client";

export default function SaleButton({ tri, name, initial_price }: { tri: string; name: string; initial_price: number }) {
  return (
    <div id="JUP" className="drink">
      <div className="name">
        <span className="trigram">{tri}</span> - <span className="full_name">{name}</span>
      </div>
      <div className="infos">
        <div className="prices">
          <span className="actual_price">2.5€</span>
          <div>
            <div className="initial_price">{initial_price}€</div>
            <div className="variation">0%</div>
          </div>
        </div>
        <div className="add_sale" style={{ backgroundColor: "hsl(0, 90%, 60%)" }}>
          0
        </div>
      </div>
    </div>
  );
}
