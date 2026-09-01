export default function Badge({ children, variant = "primary", className = "" }) {
    const variants = {
        primary: "bg-blue-600 text-white",
        glass: "bg-white/20 backdrop-blur text-white",
        success: "bg-green-100 text-green-700",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}