import { useEffect, useState } from "react";
import getCatData from "../utils/getCatData";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Card, Box } from "@mui/material";

const Cats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect - хук, нужный для отправки асинхронного запроса - в данном случае для получения данных из апишки
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCatData();
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
          data.slice(0, 8).map((cat, index) => (
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
              <h2>{cat.breeds[0].name}</h2>
              <Box sx={{ maxWidth: "300px" }}>
                <img src={cat.url} alt="A cute cat" className="card_img" />
              </Box>
              <Modal id={cat.id} type="cat"></Modal>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Cats;