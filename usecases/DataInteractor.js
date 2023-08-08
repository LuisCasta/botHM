const estados    = require('../helpers/estados.json')
const datos      = require('../helpers/municipios.json')
const provincias = require('../helpers/provincias.json')
const cantones   = require('../helpers/cantones.json')
const parseW     = require('../helpers/helperParseWords')

module.exports = () => {

    async function GetStates() {
        
        let result = [];

        result.status = 200;
        result.message = "Success";
        result.data = estados;
        return result;
    }

    async function GetTown(data) {
        
        let parseState = parseW.parseWordsLower(data.estado)
        let estado = parseState
        let municipios = datos[estado];
        let result = [];

        result.status = 200;
        result.message = "Success";
        result.data = municipios;
        return result;
    }

    async function GetProvincias() {
        
        let result = [];

        result.status = 200;
        result.message = "Success";
        result.data = provincias;
        return result;
    }

    async function GetCanton(data) {
        
        let result = [];
        const provincia = data.provincia
        const canton    = cantones[provincia];
        result.status   = 200;
        result.message  = "Success";
        result.data     = canton;
        return result;
    }

    return {
        GetStates,
        GetTown,
        GetProvincias,
        GetCanton
    }
};