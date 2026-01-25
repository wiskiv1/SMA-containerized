"use client";
import SaleButton from "./SaleButton";
import { useEffect, useRef, useState } from "react";

export default function SaleWindow() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div id="drinks">
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <>
      <div id="drinks">
        <SaleButton tri={"JUP"} name={"Jupiler"} initial_price={2.5} />
      </div>
    </>
  );
}
