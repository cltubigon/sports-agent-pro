import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;




// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (geturl) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const options = { method: 'GET', url: geturl };
//         const response = await axios.request(options);
//         setData(response.data);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [geturl]);

//   return { data, loading, error };
// };

// export default useFetch;
