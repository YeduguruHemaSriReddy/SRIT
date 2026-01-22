import React from "react";

export const Carousel = ({ children }) => {
  return <div className="overflow-x-auto flex gap-4">{children}</div>;
};

export const CarouselContent = ({ children }) => <>{children}</>;
export const CarouselItem = ({ children, className }) => (
  <div className={`flex-shrink-0 ${className}`}>{children}</div>
);

export const CarouselNext = ({ className }) => <button className={className}>Next</button>;
export const CarouselPrevious = ({ className }) => <button className={className}>Prev</button>;
