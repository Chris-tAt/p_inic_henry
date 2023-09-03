const axios = require('axios');
const Dog = require('../models/Dog'); 
const Temperaments = require('../models/Temperaments'); 

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
        const resultado = await Dog.findAll({
            where: {
                id: id
            },
            include: Temperaments
        });

        
        const listaDogs = resultado.map((dog) => ({
            id: dog.id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span + ' years',
            image: dog.image,
            temperament: dog.temperaments.map((t) => t.name).join(", ")
        }));

        return listaDogs;
    } catch (error) {
        console.error('Error en getDogsByIdFromDatabase', error);
        throw error;
    }
};

const formatApiData = (apiData) => {
    let weightRange = '';
    if (apiData.weight.metric === "NaN") {
        weightRange = "27 - 34";
    } else if (apiData.weight.metric.split(" - ")[0] === "NaN") {
        weightRange = "6 - 8";
    } else {
        weightRange = apiData.weight.metric;
    }

    const referenceImageId = apiData.reference_image_id;
    const imageUrl = `https://cdn2.thedogapi.com/images/${referenceImageId}.jpg`;

    const formattedData = {
        image: imageUrl,
        name: apiData.name,
        temperament: apiData.temperament ? apiData.temperament : 'Perrito sin temperamento',
        weight: weightRange,
        height: apiData.height.metric,
        life_span: apiData.life_span
    };

    return formattedData;
};



//estas son dos logicas que implemente cuando estaba sin handlers ( una contiene la logica que me enseño gana y otra contiene una logica mas estructurada con formateo)


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