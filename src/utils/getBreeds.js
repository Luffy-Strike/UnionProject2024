// import { apiKey as dogKey } from "./getDogData";
// import { apiKey as catKey } from "./getCatData";

// const getBreeds = async () => {
//   const catResponse = await fetch("https://api.thecatapi.com/v1/breeds", {
//     headers: {
//       "x-api-key": catKey,
//     },
//   });
//   const dogResponse = await fetch("https://api.thedogapi.com/v1/breeds", {
//     headers: {
//       "x-api-key": dogKey,
//     },
//   });
//   const breeds = Promise.all([catResponse, dogResponse]).then((values) => values);
//   return breeds;
// };

// export const breeds = await getBreeds();