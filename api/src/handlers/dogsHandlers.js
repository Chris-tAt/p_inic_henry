const {createNewBreeds} = require('../controllers/CreateDogsControl');
const { getDogsByIdFromApi, getDogsByIdFromDatabase, formatApiData} = require('../controllers/BreedsByIdController')
// const { getInfoDogsApi, getInfoDogsDB } = require('../controllers/allNameBreedsControl');
const { getBreedsOrName, getAllBreeds } = require('../controllers/allNameBreedsControl');

const  getBreedsHandler = async (req, res) => {
    const { name } = req.query;
    try {
         if(name){
            const getDogsByName = await getBreedsOrName(name)
            res.status(200).json(getDogsByName);
         }else {
            const response = await getAllBreeds()
            res.status(200).json(response);
         }
       
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    // try {
    //     const apiData = await getInfoDogsApi();
    //     const dbData = await getInfoDogsDB();
    //     const allBreeds = [...apiData, ...dbData];

    //     if (name) {
    //         const nameDogsFilter = allBreeds.filter((dogName) =>
    //             dogName.name.toLowerCase().includes(name.toLowerCase())
    //         );

    //         if (nameDogsFilter.length) {
    //             res.status(200).send(nameDogsFilter);
    //         } else {
    //             res.status(404).send({ msg: 'No se encontró ningún perro con ese nombre' });
    //         }
    //     } else {
    //         res.status(200).json(allBreeds);
    //     }
    // } catch (error) {
    //     console.error("Hubo un error en getBreedsOrName:", error);
    //     res.status(500).json('Hubo un error en el servidor');
    // }
};
    
    
    const getBreedsByIdHandler = async (req, res, next) => {
        const { id } = req.params;
    
        try {
            if (!isNaN(id)) {
                const apiData = await getDogsByIdFromApi(id);
    
                if (!apiData) {
                    return res.status(404).send('No se encontró el perrito requerido en la API, inténtelo de nuevo');
                }
    
                const formattedApiData = formatApiData(apiData);
    
                return res.json(formattedApiData);
            } else {
                const dbData = await getDogsByIdFromDatabase(id);
    
                if (dbData.length === 0) {
                    return res.status(404).send('No se encontró el perrito requerido en la base de datos, inténtelo de nuevo');
                }
    
                return res.json(dbData);
            }
        } catch (error) {
            next(error);
        }
    };

    const createBreedHandler = async (req, res) => {
        const {image, name, height_min, height_max, weight_min, weight_max, life_span, sourceDB, temperament} = req.body;
        try {
            const response = await createNewBreeds(image, name, height_min, height_max, weight_min, weight_max, life_span, sourceDB, temperament); 
            res.status(200).json(response);

        } catch (error) {
            res.status(400).json({error: error.message});
        }
       

    }; 

    module.exports = {
        getBreedsHandler,
        getBreedsByIdHandler,
        createBreedHandler
    }