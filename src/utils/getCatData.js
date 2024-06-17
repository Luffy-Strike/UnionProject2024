const apiKey = import.meta.env.VITE_CAT_API_KEY;

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": apiKey,
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};    

const getCatData = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&limit=10&has_breeds=1", requestOptions)
  .catch(error => console.log('error', error));
  const data = await response.json();

  return data;
}

export const getCatDataById = async (id) => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`, requestOptions)
  .catch(error => console.log('error', error));
  const data = await response.json();

  return data;
};

export default getCatData;