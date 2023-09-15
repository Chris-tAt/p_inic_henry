
const { Dog, Temperaments } = require('../db');

const createNewBreeds = async (name, height_min, height_max, weight_min, weight_max, life_span, temperament) => {
    try {
        const defaultImage = 'default'; 
        const defaultSourceDB = true;

        const newRace = await Dog.create({
            image: defaultImage,
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span: life_span,
            sourceDB: defaultSourceDB
        });
        


        const temperamentArray = temperament.split(',').map((item) => item.trim());

        for (const element of temperamentArray) {
            const [temperamentDB] = await Temperaments.findOrCreate({ 
                where: { name: element },
                defaults: {
                    name: element
                }
            });
            await newRace.addTemperaments(temperamentDB);
        }

        return "Raza creada exitosamente";
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createNewBreeds
};




