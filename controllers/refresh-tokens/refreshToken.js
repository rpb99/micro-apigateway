const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const apiAdapter = require("../../routes/apiAdapter");

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const { email, refresh_token } = req.body;

    if (!refresh_token || !email)
      return res
        .status(400)
        .json({ status: "error", message: "invalid token" });

    await api.get("/refresh-tokens", {
      params: { refresh_token },
    });

    jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err)
        return res.status(403).json({ status: "error", message: err.message });

      if (email !== decoded.data.email)
        return res
          .status(400)
          .json({ status: "error", message: "email is not valid" });

      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });

      return res.json({ status: "success", data: { token } });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED")
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
