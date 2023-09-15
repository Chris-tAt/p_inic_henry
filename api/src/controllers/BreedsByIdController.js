const axios = require('axios');
// const Dog = require('../models/Dog'); 
// const Temperaments = require('../models/Temperaments'); 
const {Dog, Temperaments} = require ('../db')
require("dotenv").config();
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1/breeds";
const fs = require('fs');
const path = require('path');


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
            image:`data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, '../img/imagenDB.jpg')).toString('base64')}`,
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