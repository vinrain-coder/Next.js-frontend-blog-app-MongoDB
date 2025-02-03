"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function useFetchData(apiEndPoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiEndPoint) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiEndPoint);
        const alldata = res.data;
        setAlldata(alldata);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [apiEndPoint]);

  return { alldata, loading };
}

export default useFetchData;
