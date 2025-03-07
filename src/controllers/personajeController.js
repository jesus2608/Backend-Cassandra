const personajeService = require("../services/personajeService");
const {v4: uuidv4} = require('uuid');

const getAllPersonajes = async (req, res) => {
    try {
        const personajes = await personajeService.getAllPersonajes(req.query);  // Pasamos los filtros
        res.status(200).json(personajes);
    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || "Error al obtener los personajes" });
    }
};


const getOnePersonaje = async (req, res) => {
    const { personajeId } = req.params;
    console.log('Obteniendo personaje con ID:', personajeId);  // Depurar el ID recibido
    try {
        const personaje = await personajeService.getOnePersonaje(personajeId);  // Llamada al servicio
        if (!personaje) {
            return res.status(404).json({ message: "Personaje no encontrado" });  // Si no se encuentra
        }
        res.status(200).json(personaje);
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        res.status(error?.status || 500).json({ message: error?.message || "Error al obtener el personaje" });
    }
};


const createNewPersonaje = (req, res) => {
    const newPersonaje = req.body;
    const createdPersonaje = personajeService.createOnePersonaje(newPersonaje);
    res.status(201).json(createdPersonaje);
};



const updateOnePersonaje = async (req, res) => {
    const { personajeId } = req.params;  
    const changes = req.body;         
    try {
        const updatedPersonaje = await personajeService.updateOnePersonaje(personajeId, changes);
        res.status(200).json(updatedPersonaje);  
    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || "Error al actualizar el personaje" });
    }
};


const deleteOnePersonaje = async (req, res) => {
    const { personajeId } = req.params;  
    
    try {
        await personajeService.deleteOnePersonaje(personajeId);
        res.status(200).json({ message: "Personaje eliminado correctamente" }); 
    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || "Error al eliminar el personaje" });
    }
};




module.exports = {
    getAllPersonajes,
    getOnePersonaje,
    createNewPersonaje,
    updateOnePersonaje,
    deleteOnePersonaje
};

