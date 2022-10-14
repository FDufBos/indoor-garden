import { PropsWithChildren } from "react";

export const PreferenceItem: React.FC<
  PropsWithChildren<{
    /** The label of the item */
    label: string;
  }>
> = ({ label, children }) => (
  <div className="flex flex-row justify-between items-center h-12 px-4 py-3">
    <p className="text-gray-900">{label}</p>
    <div className="text-amber-500">{children}</div>
  </div>
);
export default PreferenceItem;
