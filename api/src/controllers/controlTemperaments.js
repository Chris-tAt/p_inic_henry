const axios = require('axios');
const { Temperaments } = require('../db');
require("dotenv").config();
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1/breeds";

const getTemperaments = async () => {
    try {
        const temps_db = await Temperaments.findAll();
        if (temps_db.length) {
            const response = temps_db.map((e) => e.name);
            return response;
        } else {
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            let temps = [];
            response.data.forEach((tempe) => {
                if (tempe.temperament) {
                    temps = temps.concat(tempe.temperament.split(', '));
                }
            });
            const setTemps = new Set(temps);
            const arrTemps = [...setTemps];

            arrTemps.forEach((tem) => Temperaments.create({
                name: tem
            }));
            return arrTemps;
        }
    } catch (error) {
        throw new Error(`Oops! Something went wrong.`);
    }
};
module.exports = {getTemperaments}