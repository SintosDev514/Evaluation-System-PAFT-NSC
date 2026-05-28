import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
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
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <img
              src={logo}
              alt="PAFT-NSC logo"
              className="h-10 w-10 rounded-lg border border-slate-200 bg-white object-cover shadow-sm"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                PAFT-NSC
              </p>
              <h1 className="text-base font-bold text-slate-900">
                Evaluation System
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {publicLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-semibold transition ${
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
                    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-brand-700 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            <div className="ml-2 border-l border-slate-200"></div>
            {!isAdmin ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 ${
                    isActive ? "bg-brand-700 text-white border-brand-700" : ""
                  }`
                }
              >
                Admin Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </nav>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
            >
              <div className="space-y-2 px-4 py-4">
                {publicLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2 text-sm font-semibold transition ${
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
                        `block rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "bg-brand-700 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                <div className="border-t border-slate-200 pt-2">
                  {!isAdmin ? (
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 ${
                          isActive
                            ? "bg-brand-700 text-white border-brand-700"
                            : ""
                        }`
                      }
                    >
                      Admin Login
                    </NavLink>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
};

export default Navbar;
