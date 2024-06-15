import { useEffect, useState } from 'react';
import { getDogData } from "../utils/getDogData";
import Modal from "../components/Modal";

const Dogs = () => {
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
    <div className='dogs_container'>
      {data && data.map((dog, index) => (
        <div key={index} className='card_content'>
          <h2 className='card_content-title'>{dog.breeds[0].name}</h2>
          <img src={dog.url} alt="A cute doggo" className='card_img' />
          <Modal id={dog.id}></Modal>
        </div>
      ))}
    </div>
  );
}

export default Dogs;