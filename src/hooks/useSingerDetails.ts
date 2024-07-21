import axios from "axios";
import { useEffect, useState } from "react";

interface SingerDetailsFromHookType {}

const useSingerDetails = (PropertyId: string) => {
  const [singerDetailsFromHook, setSingerDetailsFromHook] =
    useState<SingerDetailsFromHookType | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await axios.get(``);

        setSingerDetailsFromHook(response.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [PropertyId]);

  return { singerDetailsFromHook, loading, error };
};

export default useSingerDetails;
