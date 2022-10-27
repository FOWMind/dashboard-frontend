const { checkJWT } = require("../../../utils/checkJWT");

export default function handler(req, res) {
  if (req.method === "GET") {
    const userCookie = req.cookies[process.env.JWT_USER_COOKIE_NAME];
    if (!userCookie) {
      return res.status(200).json({ message: "unauthenticated", status: 401 });
    }

    const validToken = checkJWT(userCookie);
    if (validToken) {
      return res.status(200).json({ message: "authenticated", status: 200 });
    } else {
      return res.status(200).json({ message: "unauthenticated", status: 401 });
    }
  } else {
    res.status(405).end();
  }
}
