import React from "react";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogoIcon({ className = "w-6 h-6" }: BrandLogoProps) {
  return (
    <img
      src="https://dizzy-rose-762loqgz.edgeone.app/partenaire-4.png"
      alt="Miss Ambassadrice Consommer Local Logo"
      referrerPolicy="no-referrer"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-110`}
    />
  );
}

