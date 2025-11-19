import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";

export default function Layout() {
  const nav = useNavigate();
  const loc = useLocation();

  const goHome = () => nav("/");
  const goProjects = () => {
    if (loc.pathname !== "/") {
      nav("/");
      // wait for Home to mount, then smooth-scroll
      setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 0);
    } else {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-gray-100 overflow-x-hidden">
      {/* NAVBAR (shared) */}
      <nav className="fixed top-0 left-0 right-0 z-50
                      bg-black/40 backdrop-blur-md border-b border-blue-500/20
                      before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:h-[3px]
                      before:bg-gradient-to-r before:from-blue-400 before:via-cyan-300 before:to-blue-600 before:opacity-80">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3">
          <button onClick={goHome} className="text-xl font-bold gradient-text animate-gradient">
            Rayner Swartz
          </button>
          <div className="hidden sm:flex gap-6 text-gray-300">
            <button onClick={goHome} className="hover:text-blue-400 transition">Home</button>
            <button onClick={goProjects} className="hover:text-blue-400 transition">Projects</button>
            <Link to="/about" className="hover:text-blue-400 transition">About</Link>
            <Link to="/#contact" className="hover:text-blue-400 transition">Contact</Link>
          </div>
          <button className="sm:hidden text-gray-300">☰</button>
        </div>
      </nav>

      {/* page content offset below fixed nav */}
      <main className="pt-20">
        <Outlet />
      </main>

      <ChatWidget />
    </div>
  );
}
