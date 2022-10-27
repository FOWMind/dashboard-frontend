import { useState, useEffect } from "react";
import { checkLogged } from "../utils";

export function useAuthenticated() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isLogged = async () => {
      const logged = await checkLogged();
      setAuthenticated(logged);
    };
    isLogged();
  }, [authenticated]);

  return { authenticated };
}
