import fetch from "node-fetch";

import { API } from "../../../utils/constants";

export default function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    return fetch(`${API.URL}/${API.ENDPOINTS.EDIT_WORK_BY_ID}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API.KEY,
      },
      body: req.body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return reject(response);
      })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(404).json(err));
  } else {
    return res.status(405).end();
  }
}
