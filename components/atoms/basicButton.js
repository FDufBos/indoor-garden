import React from "react";

export default function BasicButton({ children, bgColor, textColor }) {
  return (
    <div
      className={` 
      ${textColor} 
      ${bgColor}
       text-gray-600 text-sm
       min-w-fit 
       flex flex-row gap-2 items-center 
       px-[10px] py-[5px] 
       rounded-full shadow-lg hover:shadow-sm 
       hover:scale-95
       transition-all duration-100 ease-in
       	`}
    >
      {children}
    </div>
  );
}
