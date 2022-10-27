export function Logout() {
  fetch("/api/logout", { credentials: "include" }).then((response) => {
    if (response.ok) {
      return window.location.replace("/");
    }
    return;
  });
}
