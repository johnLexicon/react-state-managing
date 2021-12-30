import { useState, useEffect } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const promises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        fetch(baseUrl + url).then((response) => {
          if (response.ok) {
            response.json().then((result) => resolve(result));
          } else {
            reject(response);
          }
        });
      });
    });

    Promise.all(promises)
      .then((results) => setData(results))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
