const estados = require('../helpers/estados.json')
const datos = require('../helpers/municipios.json')

module.exports = () => {

    async function GetStates() {
        
        let result = [];

        result.status = 200;
        result.message = "Success";
        result.data = estados;
        return result;
    }

    async function GetTown(data) {
        

        let estado = data.estado;
        let municipios = datos[estado];
        let result = [];

        result.status = 200;
        result.message = "Success";
        result.data = municipios;
        return result;
    }

    return {
        GetStates,
        GetTown
    }
};