import React from "react";

export default function Logo() {
  function handleAnimateLogo(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.currentTarget;

    target.animate(
      [
        { transform: "rotate(5deg)" },
        { transform: "rotate(-5deg)" },
        { transform: "rotate(5deg)" },
        { transform: "rotate(-5deg)" },
        { transform: "rotate(0deg)" },
      ],
      { duration: 500 },
    );
  }

  return (
    <div className="flex w-full justify-center">
      <img
        className="w-60"
        src="/logo.webp"
        alt="PixelArt de un limón"
        onClick={handleAnimateLogo}
      />
    </div>
  );
}
