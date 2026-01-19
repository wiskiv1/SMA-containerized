"use client";

import { ReactNode } from "react";

/**
 * @author Witse Panneels
 */

export default function BigButton({
  name,
  bgImage,
  clBack,
  children,
}: {
  name: string;
  bgImage: string;
  clBack: () => void;
  children: ReactNode;
}) {
  return (
    <div
      id={name}
      className="BigButton"
      style={{
        backgroundImage: bgImage,
      }}
      onClick={clBack}
    >
      {children}
    </div>
  );
}
