const axios = require('axios');
// const Dog = require('../models/Dog'); 
// const Temperaments = require('../models/Temperaments'); 
const {Dog, Temperaments} = require ('../db')

const getDogsByIdFromApi = async (id) => {
    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error en getDogsByIdFromApi', error);
        throw error;
    }
};

const getDogsByIdFromDatabase = async (id) => {
    try {
        const resultado = await Dog.findByPk(id, {
            include: Temperaments
        });

        if (!resultado) {
            return null; 
        }
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

const formatApiData = (apiData) => {
    
    const weightParts = (apiData.weight && apiData.weight.metric) ? apiData.weight.metric.split(" - ") : ["No disponible"];

    
    const heightParts = (apiData.height && apiData.height.metric) ? apiData.height.metric.split(" - ") : ["No disponible"];

    const referenceImageId = apiData.reference_image_id;
    const imageUrl = `https://cdn2.thedogapi.com/images/${referenceImageId}.jpg`;

    const formattedData = {
        id: apiData.id,
        image: imageUrl,
        name: apiData.name,
        temperament: apiData.temperament ? apiData.temperament : 'Esta raza no tiene registrado temperamento',
        height_min: heightParts[0],
        height_max: heightParts[1],
        weight_min: weightParts[0],
        weight_max: weightParts[1],
        life_span: apiData.life_span
    };

    return formattedData;
};



//estas son dos logicas que implemente cuando estaba sin handlers ( una contiene la logica que me enseño gama y otra contiene una logica mas estructurada con formateo)


// const getBreedsById = async (id, source) => {
//     const DogApiandDB = source === "api" 
//     ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
//     : await Dog.findByPk(id);
//     return DogApiandDB;
// }


// const getDogsByIdFromDatabase = async (id) => {
//     try {
//      ;   const resultado = await Dog.findAll({
//             where: {
//                 id: id
//             },
//             include: Temperaments
//         });

//         const racesStrig = resultado.map((result) => {
//             const temper = result.dataValues.temperaments && result.dataValues.temperaments.map((t) => t.name);
//             const temperaments = temper.join(", ");
//             return {
//                 ...result.dataValues,
//                 temperament: temperaments
//             };
//         });
        

//         const listaDogs = racesStrig.map((dog) => ({
//             id: dog.id,
//             name: dog.name,
//             height: dog.height,
//             weight: dog.weight,
//             life_span: dog.life_span + ' years',
//             image: dog.image,
//             temperament: dog.temperament,
//         }));

//         return listaDogs;
//     } catch (err) {
//         console.error(err);
       
//     }
// };

// const getoneByIdApi = async (id) => {
//     try {
//         const allForFilter = await axios(`https://api.thedogapi.com/v1/breeds`);
//         if (id) {
//             const result = allForFilter.data.filter((e) => e.id === Number(id));
//             return result;
//         }
//     } catch (error) {
//         console.error('Error en getOneById', error);
//     }
// };

// const getBreedsById = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         if (id.length < 4) {
//             const allInfoById = await getoneByIdApi(id);

//             if (!allInfoById || allInfoById.length === 0) {
//                 return res.status(404).send('No se encontró el perrito requerido, inténtelo de nuevo');
//             }

//             const formattedInfo = allInfoById.map(formatDogInfo);

//             return res.json(formattedInfo);
//         } else {
//             const infoDbById = await getDogsByIdFromDatabase(id);

//             if (infoDbById.length === 0) {
//                 return res.status(404).send('No se encontró el perrito requerido en la base de datos, inténtelo de nuevo');
//             }

//             return res.json(infoDbById);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    getDogsByIdFromApi,
    getDogsByIdFromDatabase,
    formatApiData
};