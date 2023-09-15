const axios = require('axios');
const { Dog, Temperaments } = require('../db');
const {Op} = require('sequelize')
require("dotenv").config();
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1/breeds";
const fs = require('fs');
const path = require('path');




const cleanInfoApi = (arr) => {
    return arr.map((dog) => {
        let weightMio = '';
        const parts = dog.weight.metric.split(" - ");
        if (isNaN(parseFloat(parts[0]))) {
             weightMio = "6 - 8";
            } else {
                 weightMio = dog.weight.metric;
                }
    return {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        weight: weightMio,
        temperament: dog.temperament,
       
    }

})
}
const getAllBreeds = async () => {
    const DogsDB = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });

    const InfoApi = (await axios.get(`${URL_API}?api_key=${API_KEY}`)).data;
    const DogsInfoApi = cleanInfoApi(InfoApi);

    const formatDataDB = DogsDB.map((raza) => {
        const temperaments = (raza.dataValues.temperaments || []).map((temp) => temp.name).join(", ");;
       
        
        const imagePath ='../img/imagenDB.jpg';
        const imageData = fs.readFileSync(path.join(__dirname, imagePath));
    const imageBase64 = `data:image/jpeg;base64,${imageData.toString('base64')}`;
        return {
            ...raza.dataValues,
            id: raza.dataValues.id,
            image: imageBase64, 
            name: raza.dataValues.name,
            weight: `${raza.dataValues.weight_min} - ${raza.dataValues.weight_max}`,
            temperament: temperaments || 'No hay temperamentos disponibles'
        };
    });

    return [...formatDataDB, ...DogsInfoApi];
};
const getBreedsOrName = async (name) => {
    const InfoApi = (await axios.get(`${URL_API}?api_key=${API_KEY}`)).data;
    const DogsInfoApi = cleanInfoApi(InfoApi);

    const BreedsFiltered = DogsInfoApi.filter((breed) =>
        breed.name.toLowerCase() === name.toLowerCase()
    );

    const breedsDB = await Dog.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [Temperaments],
    });
    const formatDataDB = breedsDB.map((raza) => ({
        id: raza.dataValues.id,
        image: `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, '../img/imagenDB.jpg')).toString('base64')}`,
        name: raza.dataValues.name,
        weight: `${raza.dataValues.weight_min} - ${raza.dataValues.weight_max}`,
        temperament: (raza.dataValues.temperaments || []).map((temp) => temp.name).join(", ") || 'No hay temperamentos disponibles',
    }));

    
    return [...BreedsFiltered, ...formatDataDB];
};



module.exports = {
    
    getBreedsOrName,
    getAllBreeds

};