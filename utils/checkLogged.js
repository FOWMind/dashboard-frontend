export function checkLogged() {
  return fetch("/api/logged", { credentials: "include" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data?.status === 401) {
        return false;
      } else if (data?.status === 200) {
        return true;
      }
    });
}
