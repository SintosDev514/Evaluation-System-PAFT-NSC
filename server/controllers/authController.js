const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_API_TOKEN;

  if (!adminEmail || !adminPassword || !adminToken) {
    return res
      .status(500)
      .json({ message: "Admin credentials are not configured on the server." });
  }

  if (email === adminEmail && password === adminPassword) {
    return res.json({ token: adminToken, email: adminEmail });
  }

  return res.status(401).json({ message: "Invalid admin credentials." });
};

module.exports = { loginAdmin };
