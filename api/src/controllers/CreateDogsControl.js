
const {Dog, Temperaments, tempe_dogs} = require('../db')

const createNewBreeds = async (image, name, height_min, height_max, weight_min, weight_max, life_span, sourceDB, temperament) => {
    try {
        const temperamentDB = await Temperaments.findAll({where: {name: temperament}})
        const newRace = await Dog.create({
            image,
            name,
            height_min,
            height_max, 
            weight_min,
            weight_max,
            life_span,
            sourceDB
        });

        await newRace.addTemperaments(temperamentDB[0], {through: tempe_dogs});
       

        return "Raza creada exitosamente";
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createNewBreeds
}
