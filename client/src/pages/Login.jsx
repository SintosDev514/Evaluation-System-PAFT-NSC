import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginAdmin } from "../services/evaluationService";
import { saveAdminToken, isAdminAuthenticated } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginAdmin(email, password);
      saveAdminToken(response.token);
      toast.success("Admin login successful.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Check credentials.",
      );
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl bg-white/95 p-10 shadow-xl shadow-slate-300/40">
      <h1 className="text-3xl font-semibold text-slate-900">Admin Login</h1>
      <p className="mt-3 text-slate-600">
        Only the admin can access analytics, dashboards, and response data.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Admin Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="admin@example.com"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="Enter your password"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-700 px-6 py-3 text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Admin Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
