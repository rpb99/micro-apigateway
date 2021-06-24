const apiAdapter = require("../../routes/apiAdapter");

const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = {
  async create(req, res) {
    try {
      const media = await api.post("/media", req.body);
      return res.json(media.data);
    } catch (error) {
      if (error.code === "ECONNREFUSED")
        return res
          .status(500)
          .json({ status: "error", message: "service unavailable" });
    }
  },
  async getAll(req, res) {
    try {
      const media = await api.get("/media");
      return res.json(media.data);
    } catch (error) {
      if (error.code === "ECONNREFUSED")
        return res
          .status(500)
          .json({ status: "error", message: "service unavailable" });
    }
  },

  async destroy(req, res) {
    try {
      const media = await api.delete(`/media/${req.params.id}`);
      return res.json(media.data);
    } catch (error) {
      if (error.code === "ECONNREFUSED")
        return res
          .status(500)
          .json({ status: "error", message: "service unavailable" });

      const { status, data } = error.response;
      return res.status(status).json(data);
    }
  },
};
