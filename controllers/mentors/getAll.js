const apiAdapter = require("../../routes/apiAdapter");

const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const mentors = await api.get("/api/mentors");
    return res.json(mentors.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED")
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
  }
};
