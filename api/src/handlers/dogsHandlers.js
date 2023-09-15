const {createNewBreeds} = require('../controllers/CreateDogsControl');
const { getDogsByIdFromApi, getDogsByIdFromDatabase} = require('../controllers/BreedsByIdController')
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
        const apiData = await getDogsByIdFromApi(id);
        if (!isNaN(id)) {
            const formatApiData = apiData?.map(dogapi => {

                const weightParts = (dogapi.weight && dogapi.weight.metric) ? dogapi.weight.metric.split(" - ") : ["No disponible"];

    
                const heightParts = (dogapi.height && dogapi.height.metric) ? dogapi.height.metric.split(" - ") : ["No disponible"];
            
                const referenceImageId = dogapi.reference_image_id;
                const imageUrl = `https://cdn2.thedogapi.com/images/${referenceImageId}.jpg`;
            
                const formattedData = {
                    id: dogapi.id,
                    image: imageUrl,
                    name: dogapi.name,
                    temperament: dogapi.temperament ? dogapi.temperament : 'Esta raza no tiene registrado temperamento',
                    height_min: heightParts[0],
                    height_max: heightParts[1],
                    weight_min: weightParts[0],
                    weight_max: weightParts[1],
                    life_span: dogapi.life_span
                };
            
                return formattedData;
            })
            formatApiData.length === 0 ? res.status(404).send('No se encontró el perrito requerido en la API, inténtelo de nuevo') : res.send(formatApiData)
        }else {
            const dbData = await getDogsByIdFromDatabase(id);
            return res.json(dbData)
        }
       
        

    } catch (error) {
        next(error);
     }
        };


    const createBreedHandler = async (req, res) => {
        const {name, height_min, height_max, weight_min, weight_max, life_span, temperament} = req.body
        try {
            const response = await createNewBreeds(name, height_min, height_max, weight_min, weight_max, life_span, temperament); 
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