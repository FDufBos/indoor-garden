import React from "react";

export default function BasicButton({
  onPress,
  children,
  bgColor,
  textColor,
  xPadding,
  yPadding,
  innerText,
  otherText,
  icon,
}) {
  return (
    <div
      className={` ${textColor} ${bgColor} text-gray-600 min-w-fit flex flex-row items-center ${xPadding} ${yPadding} px-[10px] py-[5px] rounded-full gap-2 shadow-md transition-all duration-500 text-sm	`}
    >
      {children}
    </div>
  );
}
