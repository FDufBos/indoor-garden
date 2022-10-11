import React, { PropsWithChildren } from "react";

/**
 * @deprecated This component is deprecated
 */
export const BasicButton: React.FC<
  PropsWithChildren<{
    /** The text color */
    bgColor: string;
    /** The background color */
    textColor: string;
  }>
> = ({ children, bgColor, textColor }) => (
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
export default BasicButton;
