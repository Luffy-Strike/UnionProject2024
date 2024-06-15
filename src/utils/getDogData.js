const apiKey = import.meta.env.VITE_DOG_API_KEY;

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  });

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

export const getDogData = async () => {
  const response = await fetch("https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1", requestOptions)
  .catch(error => console.log('error', error));
  const data = await response.json();

  return data;
};

export const getDogDataById = async (id) => {
  const response = await fetch(`https://api.thedogapi.com/v1/images/${id}`, requestOptions)
  .catch(error => console.log('error', error));
  const data = await response.json();

  return data;
}