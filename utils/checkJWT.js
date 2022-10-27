import jwt from "jsonwebtoken";

export function checkJWT(userCookie) {
  if (userCookie) {
    const validUserCookie = jwt.verify(userCookie, process.env.JWT_USER_SECRET);
    if (!validUserCookie) {
      // unauthenticated
      return false;
    }
    // authenticated
    return validUserCookie;
  }
}
