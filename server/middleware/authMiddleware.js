const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const adminToken = process.env.ADMIN_API_TOKEN;

  if (!authHeader || !authHeader.startsWith("Bearer ") || !adminToken) {
    return res
      .status(401)
      .json({ message: "Not authorized. Admin token missing." });
  }

  const token = authHeader.split(" ")[1];
  if (token !== adminToken) {
    return res.status(403).json({ message: "Forbidden. Invalid admin token." });
  }

  next();
};

module.exports = { protectAdmin };
