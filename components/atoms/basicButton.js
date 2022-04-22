import React, { useState } from "react";

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
  const [pressState, setPressState] = useState(false);

  const whenClicked = () => {
    setPressState((prevState) => !prevState)
  }

  return (
    <button
      onClick={() => whenClicked(pressState)}
      className={` ${textColor} ${bgColor} text-gray-600 min-w-fit flex flex-row items-center ${xPadding} ${yPadding} px-[10px] py-[5px] rounded-full gap-2 shadow-md transition-all duration-500 text-sm	`}
    >
      {pressState ? innerText : otherText}
      <div className={`${pressState ? "-rotate-180" : "-rotate-90"} transition-all origin-[50%_45%] duration-500	`}>{icon}</div>
      {children}
    </button>
  );
}
