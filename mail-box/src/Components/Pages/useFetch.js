import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetch;
