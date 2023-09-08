
const { Dog, Temperaments } = require('../db');

const createNewBreeds = async (image, name, height_min, height_max, weight_min, weight_max, life_span, sourceDB, temperament) => {
    try {
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

        const temperamentArray = temperament.split(',').map((item) => item.trim());

        for (const element of temperamentArray) {
            const [temperamentDB] = await Temperaments.findOrCreate({ 
                where: { name: element },
                defaults: {
                    name: element
                }
            });
            await newRace.addTemperaments(temperamentDB[0]);
        }

        return "Raza creada exitosamente";
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createNewBreeds
};