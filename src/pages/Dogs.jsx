import { useEffect, useState } from 'react';
import getDogData from "../utils/getDogData";

const Cats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect - хук, нужный для отправки асинхронного запроса - в данном случае для получения данных из апишки
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDogData();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && data.map((dog, index) => (
        <div key={index}>
          <img src={dog.url} alt="A cute doggo" />
        </div>
      ))}
    </div>
  );
}

export default Cats;