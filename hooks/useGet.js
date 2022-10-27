import { useState, useEffect } from "react";

function useGet(url) {
  const [data, setData] = useState([]);
  const [loadState, setLoadState] = useState("idle");

  useEffect(() => {
    setLoadState("inProgress");
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setLoadState("finished"));
  }, [url]);

  return { data, loadState };
}

export { useGet };
