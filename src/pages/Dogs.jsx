import { useEffect, useState } from "react";
import { getDogData } from "../utils/getDogData";
import { Button } from "@mui/material";
import Modal from "../components/Modal";

const Dogs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  // const controlVar = '';
  // useEffect - хук, нужный для отправки асинхронного запроса - в данном случае для получения данных из апишки
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await getDogData();
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {data &&
        data.map((dog, index) => {
          const { id } = dog;
          // console.log(id);

          return (
            <div key={index} className="card_content">
              <h2 className="card_content-title">{dog.breeds[0].name}</h2>
              <img src={dog.url} alt="A cute doggo" className="card_img" />
              <Button className="btn-new" onClick={handleOpen}>
                Подробнее
              </Button>
              <Modal open={open} onClose={handleClose} id={id}></Modal>
            </div>
          )
        })}
    </div>
  );
};

export default Dogs;
