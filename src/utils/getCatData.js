import filterByRatio from "./filterByRatio";
export const apiKey = import.meta.env.VITE_CAT_API_KEY;

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
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&limit=15&has_breeds=1", requestOptions);
    const data = await response.json();

    const uniqueBreeds = new Map();

    data.forEach(item => {
      if (item.breeds && item.breeds.length > 0) {
        const breed = item.breeds[0];
        if (!uniqueBreeds.has(breed.id)) {
          uniqueBreeds.set(breed.id, item);
        }
      }
    });
    return Array.from(uniqueBreeds.values());
  } catch (error) {
    console.log('error', error);
    return [];
  }
}

export const getCatDataById = async (id) => {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds/${id}`, requestOptions)
  .catch(error => console.log('error', error));
  const data = await response.json();

  return data;
};

export default getCatData;