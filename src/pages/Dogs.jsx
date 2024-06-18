import { useEffect, useState } from "react";
import { getDogData } from "../utils/getDogData";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Card, Box } from "@mui/material";

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
    <>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "20px",
          alignItems: "center",
        }}
      >
        {data &&
          data.slice(0, 8).map((dog, index) => (
            <Card
              key={index}
              className="card_content"
              sx={{
                maxWidth: 400,
                minWidth: 250,
                flex: "1 0 150px",
                backgroundColor: "#333333",
                color: "#fff",
                boxShadow: 3,
                transition: "box-shadow 0.3s ease",
                ':hover': {
                  boxShadow: 20,
                },
              }}
            >
              <h2>{dog.breeds[0].name}</h2>
              <Box sx={{ maxWidth: "300px" }}>
                <img src={dog.url} alt="A cute dog" className="card_img" />
              </Box>
              <Modal id={dog.breeds[0].id} type="dog"></Modal>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Dogs;