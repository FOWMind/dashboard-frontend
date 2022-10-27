import fetch from "node-fetch";
const { API } = require("../../../utils/constants");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "13mb",
    },
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const work = req.body;

    return fetch(`${API.URL}/${API.ENDPOINTS.CREATE_SINGLE_WORK}`, {
      method: "POST",
      body: work,
      headers: {
        "x-api-key": API.KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return reject(response);
      })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(405).json(error));
  } else if (req.method === "GET") {
    return fetch(`${API.URL}/${API.ENDPOINTS.VIEW_WORKS}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return reject(response);
      })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(405).json(error));
  } else {
    res.status(405).end();
  }
}
