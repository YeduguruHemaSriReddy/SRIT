import React from "react";

// Local cn helper to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const Button = ({ children, className = "", size, variant, ...props }) => {
  let baseClasses = "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none";

  // Size variations
  if (size === "lg") baseClasses += " px-8 py-4 text-lg";

  // Variant styles
  if (variant === "outline") {
    baseClasses += " border border-gray-300 bg-transparent hover:bg-gray-100";
  } else {
    baseClasses += " bg-blue-600 text-white hover:bg-blue-700";
  }

  return (
    <button className={cn(baseClasses, className)} {...props}>
      {children}
    </button>
  );
};

// Helper function for AlertDialog or other components
export const buttonVariants = ({ variant } = {}) => {
  if (variant === "outline") return "border border-gray-300 bg-transparent hover:bg-gray-100";
  return "bg-blue-600 text-white hover:bg-blue-700";
};
