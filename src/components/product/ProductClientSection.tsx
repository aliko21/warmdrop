"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

export default function ProductClientSection() {
  const [selectedColor, setSelectedColor] = useState("wooden");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="lg:sticky lg:top-28">
        <ProductGallery selectedColor={selectedColor} />
      </div>
      <ProductInfo selectedColor={selectedColor} onColorChange={setSelectedColor} />
    </div>
  );
}
