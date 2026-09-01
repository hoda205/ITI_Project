export default function Breadcrumb({ items }) {
  return (
    <header className="bg-white border-b border-slate-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-semibold text-slate-900 truncate">{item.label}</span>
                ) : (
                  <>
                    <a href={item.href} className="font-medium text-slate-500 hover:underline">
                      {item.label}
                    </a>
                    <span className="text-slate-400">/</span>
                  </>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
}