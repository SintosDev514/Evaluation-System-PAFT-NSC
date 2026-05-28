import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import logo from "../assets/logo.png";
import { isAdminAuthenticated, removeAdminToken } from "../utils/auth";

const publicLinks = [{ label: "Home", path: "/" }];
const adminLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Analytics", path: "/analytics" },
  { label: "Responses", path: "/responses" },
];

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated());
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    removeAdminToken();
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <MotionConfig transition={{ duration: 0.35 }}>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-brand-900">
            <img
              src={logo}
              alt="PAFT-NSC logo"
              className="h-12 w-12 rounded-3xl border border-slate-200 bg-white p-2 object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                PAFT-NSC
              </p>
              <h1 className="text-lg font-semibold text-slate-900">
                Evaluation System
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
            >
              <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {publicLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-700 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {isAdmin &&
              adminLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-brand-700 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            {!isAdmin ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 ${
                    isActive ? "bg-brand-700 text-white border-brand-700" : ""
                  }`
                }
              >
                Admin Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-800"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
        {menuOpen && (
          <div className="space-y-3 border-t border-slate-200 bg-white px-4 pb-4 pt-4 md:hidden">
            {publicLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-700 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {isAdmin &&
              adminLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-brand-700 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            {!isAdmin ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 ${
                    isActive ? "bg-brand-700 text-white border-brand-700" : ""
                  }`
                }
              >
                Admin Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full rounded-3xl bg-brand-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-800"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>
    </MotionConfig>
  );
};

export default Navbar;
