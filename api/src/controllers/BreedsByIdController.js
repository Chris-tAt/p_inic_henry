const axios = require('axios');
// const Dog = require('../models/Dog'); 
// const Temperaments = require('../models/Temperaments'); 
const {Dog, Temperaments} = require ('../db')
require("dotenv").config();
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1/breeds";

// const getDogsByIdFromApi = async (id) => {
//     const numericId = Number(id);

//     try {
//         const response = await axios.get(`${URL_API}/${numericId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error en getDogsByIdFromApi', error);
//         throw error;
//     }
// }
// const formatApiData = (apiData) => {
    
//     const weightParts = (apiData.weight && apiData.weight.metric) ? apiData.weight.metric.split(" - ") : ["No disponible"];

    
//     const heightParts = (apiData.height && apiData.height.metric) ? apiData.height.metric.split(" - ") : ["No disponible"];

//     const referenceImageId = apiData.reference_image_id;
//     const imageUrl = `https://cdn2.thedogapi.com/images/${referenceImageId}.jpg`;

//     const formattedData = {
//         id: apiData.id,
//         image: imageUrl,
//         name: apiData.name,
//         temperament: apiData.temperament ? apiData.temperament : 'Esta raza no tiene registrado temperamento',
//         height_min: heightParts[0],
//         height_max: heightParts[1],
//         weight_min: weightParts[0],
//         weight_max: weightParts[1],
//         life_span: apiData.life_span
//     };

//     return formattedData;
// };

// const getDogsByIdFromDatabase = async (id) => {
//     try {
        
//         const resultado = await Dog.findAll({
//             where: { id: id }, 
//             include: Temperaments
//         });


//         const formatDataDB = resultado.map((raza) => {
//             const temperaments = (raza.dataValues.temperaments || []).map((temp) => temp.name).join(", ");
//             return {
//                 ...raza.dataValues,
//                 temperament: temperaments || 'No hay temperamentos disponibles'
//             };
//         });

        
//         const listaDogs = formatDataDB.map((dog) => ({
//             id: dog.id,
//             image: dog.image,
//             name: dog.name,
//             height_min: dog.height_min,
//             height_max: dog.height_max,
//             weight_min: dog.weight_min,
//             weight_max: dog.weight_max,
//             life_span: dog.life_span + ' years',
//             temperament: dog.temperament
//         }));

//         return listaDogs;
//     } catch (error) {
//         console.error('Error en getDogsByIdFromDatabase', error);
//         throw error;
//     }
// };

//---------------------------------------------------

const getDogsByIdFromDatabase = async (id) => {
    try {
        
        const resultado = await Dog.findAll({
            where: { id: id }, 
            include: Temperaments
        });


        const formatDataDB = resultado.map((raza) => {
            const temperaments = (raza.dataValues.temperaments || []).map((temp) => temp.name).join(", ");
            return {
                ...raza.dataValues,
                temperament: temperaments || 'No hay temperamentos disponibles'
            };
        });

        
        const listaDogs = formatDataDB.map((dog) => ({
            id: dog.id,
            image: dog.image,
            name: dog.name,
            height_min: dog.height_min,
            height_max: dog.height_max,
            weight_min: dog.weight_min,
            weight_max: dog.weight_max,
            life_span: dog.life_span + ' years',
            temperament: dog.temperament
        }));

        return listaDogs;
    } catch (error) {
        console.error('Error en getDogsByIdFromDatabase', error);
        throw error;
    }
};


const getDogsByIdFromApi = async (id) => {
    

    try {
        const response = await axios.get(`${URL_API}`);
        if(id) {
            const resulResponse = response.data.filter(e => e.id === Number(id));
            return (resulResponse)
        }
        
    } catch (error) {
        console.error('Error en getDogsByIdFromApi', error);
        throw error;
    }
}



module.exports = {
    getDogsByIdFromApi,
    getDogsByIdFromDatabase,
 
};