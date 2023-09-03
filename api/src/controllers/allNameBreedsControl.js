const axios = require('axios');
const { Dog, Temperaments } = require('../db');
require("dotenv").config();
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1/breeds";




const cleanInfoApi = (arr) => {
    return arr.map((dog) => {
    return {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        years: dog.life_span,
        sourceDB: false,
        temperament: dog.temperament,
       
    }

})
}
const getAllBreeds = async () => {
    const DogsDB = await Dog.findAll()
    const InfoApi = (await axios.get(`${URL_API}?api_key=${API_KEY}`)).data;
    const DogsInfoApi = cleanInfoApi(InfoApi)

    return [...DogsDB,...DogsInfoApi]

};

const getBreedsOrName = async (name) => {
    const InfoApi = (await axios.get(`${URL_API}?api_key=${API_KEY}`)).data;
    const DogsInfoApi = cleanInfoApi(InfoApi)

    const BreedsFiltered = DogsInfoApi.filter(breed => breed.name === name)

    const breedsDB = await Dog.findAll({
        where:{ name:name,},
        include: [Temperaments]
    });
    return [...BreedsFiltered,...breedsDB];

}



// const formatDogData = (dog) => {
//     let weightApi = dog.weight.metric || "25 - 30";
//     let heightApi = dog.height.metric || "60 - 80";
//     let yearsApi = dog.life_span || "8 - 15";
//     let temperamentApi = dog.temperament || 'No se encontró el temperamento del perrito';

//     if (!weightApi || weightApi === "NaN" || weightApi.split("-")[0] === "NaN") {
//         weightApi = weightApi === "NaN" ? "25 - 30" : "7 - 10";
//     }
//     if (!heightApi || heightApi === "NaN" || heightApi.split("-")[0] === "NaN") {
//         heightApi = heightApi === "NaN" ? "60 - 80" : "10 - 17";
//     }
//     if (!yearsApi || yearsApi === "NaN" || yearsApi.split("-")[0] === "NaN") {
//         yearsApi = yearsApi === "NaN" ? "8 - 15" : "6 - 10";
//     }

//     return {
//         id: dog.id,
//         image: dog.image?.url,
//         name: dog.name,
//         height: heightApi,
//         weight: weightApi,
//         years: yearsApi,
//         temperament: temperamentApi,
//         sourceDB: false
//     };
// };

// const getInfoDogsApi = async () => {
//     try {
//         const apiResponse = await axios(`${URL_API}?api_key=${API_KEY}`);
//         const apiData = apiResponse.data || [];

//         const formattedData = apiData.map(formatDogData);

//         return formattedData;
//     } catch (error) {
//         console.error('Hubo problemas en la función getInfoDogsApi: ', error);
//         throw error;
//     }
// };

// const getInfoDogsDB = async () => {
//     try {
//         const breeds = await Dog.findAll({
//             include: {
//                 model: Temperaments,
//                 attributes: ["name"],
//                 through: {
//                     attributes: [],
//                 }
//             }
//         });

//         const formattedData = breeds.map((raza) => {
//             const temperaments = (raza.dataValues.temperaments || []).map((temp) => temp.name).join(", ");
//             return {
//                 ...raza.dataValues,
//                 temperament: temperaments || 'No hay temperamentos disponibles'
//             };
//         });

//         return formattedData;
//     } catch (error) {
//         console.error("Ocurrió un error en getInfoDogsDB: ", error);
//         throw error;
//     }
// };

module.exports = {
    // getInfoDogsDB,
    // getInfoDogsApi,
    getBreedsOrName,
    getAllBreeds

};