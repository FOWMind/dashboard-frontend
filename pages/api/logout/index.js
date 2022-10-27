const { deleteCookie } = require("cookies-next");

export default function handler(req, res) {
  if (req.method === "GET") {
    deleteCookie(process.env.JWT_USER_COOKIE_NAME, { req, res });
    return res.status(200).json({ message: "logged out" });
  } else {
    return res.status(405).end();
  }
}
