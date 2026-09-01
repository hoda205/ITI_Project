export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}