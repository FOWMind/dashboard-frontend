import fetch from "node-fetch";
import { setCookie } from "cookies-next";

import { API } from "../../../utils/constants";

export default function handler(req, res) {
  if (req.method === "POST") {
    return fetch(`${API.URL}/${API.ENDPOINTS.LOGIN}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API.KEY,
      },
      body: req.body,
    })
      .then((response) => response.json())
      .then((data) => {
        const { status, message, token } = data;
        if (!token) {
          return res.status(status || 404).json({
            status: status || 404,
            message: message || "incorrect credentials",
          });
        }

        setCookie(process.env.JWT_USER_COOKIE_NAME, token, {
          req,
          res,
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(status).json({ message });
      })
      .catch((error) => res.status(405).json(error));
  } else {
    res.status(405).end();
  }
}
