import { useState, useEffect, useRef } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Function is put outside the hook to avoid reallocation of the function every time a compoment is rerendered.
function areEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

export default function useFetchAll(urls) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevUrlsRef = useRef([]); // To check if the url array has changed since last time.

  useEffect(() => {
    // Abort if the urls are equal to previous passed in urls
    if (areEqual(prevUrlsRef.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrlsRef.current = urls; // Assign the latest url array

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
  }, [urls]);

  return { data, loading, error };
}
