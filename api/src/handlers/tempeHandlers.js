const {getTemperaments} = require('../controllers/controlTemperaments');

const getTemperamentsHandlers = async (req, res) => {
    try {
        const response = await getTemperaments();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ 'msg': error.message });
    }
};

module.exports = {getTemperamentsHandlers};