import Navigation from "../Navigation";

export default function DashboardLayout({ title, subtitle, children, gradient }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className={`pt-28 pb-10 px-6 bg-gradient-to-r ${gradient}`}>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-white/80 mt-1">{subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}
