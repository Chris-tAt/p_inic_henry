const {createNewBreeds} = require('../controllers/CreateDogsControl');
const { getDogsByIdFromApi, getDogsByIdFromDatabase, formatApiData} = require('../controllers/BreedsByIdController')
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
};
    
    
    const getBreedsByIdHandler = async (req, res, next) => {
        const { id } = req.params;
    
        try {
            if (!isNaN(id)) {
                const apiData = await getDogsByIdFromApi();
    
                if (!apiData) {
                    return res.status(404).send('No se encontró el perrito requerido en la API, inténtelo de nuevo');
                }
    
                const formattedApiData = formatApiData(apiData);
    
                return res.json(formattedApiData);
            } else {
                const dbData = await getDogsByIdFromDatabase();
    
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
            res.status(201).json(response);

        } catch (error) {
            res.status(400).json({error: error.message});
        }
       

    }; 

    module.exports = {
        getBreedsHandler,
        getBreedsByIdHandler,
        createBreedHandler
    }