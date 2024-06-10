import { useEffect, useState } from 'react';
import { getCatData, getCatDataById } from "../utils/getCatData";

const Cats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // useEffect - хук, нужный для отправки асинхронного запроса - в данном случае для получения данных из апишки
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await getCatData();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to cancel request if component unmounts
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && data.map((cat, index) => (
        <div key={index}>
          <h2>{cat.breeds[0].name}</h2>
          <img src={cat.url} alt="A cute cat" />
        </div>
      ))}
    </div>
  );
}

export default Cats;