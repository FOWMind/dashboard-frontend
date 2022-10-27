import fetch from "node-fetch";
const { API } = require("../../../utils/constants");

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    return fetch(`${API.URL}/${API.ENDPOINTS.VIEW_SINGLE_WORK_BY_ID}/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return reject(response);
      })
      .then((data) => res.status(200).json(data))
      .catch((error) => {
        return res.status(404).json({ message: "work not found", error });
      });
  } else if (req.method === "DELETE") {
    return fetch(`${API.URL}/${API.ENDPOINTS.DELETE_WORK_BY_ID}/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API.KEY,
      },
    })
      .then((response) => {
        if (response.ok) {
          return res.status(204).end();
        }
        return reject(response);
      })
      .catch((error) => {
        return res.status(404).json({ message: "work not found", error });
      });
  } else {
    return res.status(405).end();
  }
}
