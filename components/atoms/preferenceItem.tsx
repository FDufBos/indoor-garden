export default function PreferenceItem({ label, children }) {
  return(
    <div className="flex flex-row justify-between items-center h-12 px-4 py-3">
      <p className="text-gray-900">{label}</p><div className="text-amber-500">{children}</div>
    </div>
  )
}