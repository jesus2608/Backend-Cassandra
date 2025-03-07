
const client = require("../database/cassandraClient");
const { v4: uuidv4 } = require('uuid');
const getAllPersonajes = async (filterParams) => {
    try {
        let query = 'SELECT * FROM personajes';
        let params = [];
        if (filterParams.gender) {
            query += ` WHERE gender = ?`;
            params.push(filterParams.gender);
        }

        const result = await client.execute(query, params, { prepare: true });
        return result.rows;
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        throw { status: 500, message: error.message };
    }
};

const getOnePersonaje = async (personajeId) => {
    try {
        const query = 'SELECT * FROM personajes WHERE id = ?';
        const result = await client.execute(query, [personajeId], { prepare: true });
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        throw { status: 500, message: error.message };
    }
};


const createOnePersonaje = async (newPersonaje) => {
    try {
        const personajeToInsert = {
            ...newPersonaje,
            createdAt: new Date().toLocaleString("en-US", { timeZone: 'UTC' }),
            updatedAt: new Date().toLocaleString("en-US", { timeZone: 'UTC' })
        };

        const query = `
            INSERT INTO personajes (id, img, character, voiceActor, appearsIn, aliases, species, gender, about, quote, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            personajeToInsert.id,
            personajeToInsert.img,
            personajeToInsert.character,
            personajeToInsert.voiceActor,
            personajeToInsert.appearsIn,
            personajeToInsert.aliases,
            personajeToInsert.species,
            personajeToInsert.gender,
            personajeToInsert.about,
            personajeToInsert.quote,
            personajeToInsert.createdAt,
            personajeToInsert.updatedAt
        ];

        
        await client.execute(query, params, { prepare: true });

        return personajeToInsert; 
    } catch (error) {
        console.error('Error al crear el personaje:', error);
        throw { status: 500, message: error.message };
    }
};





const updateOnePersonaje = async (personajeId, changes) => {
    try {
        const query = `
            UPDATE personajes 
            SET 
                img = ?, 
                character = ?, 
                voiceActor = ?, 
                appearsIn = ?, 
                aliases = ?, 
                species = ?, 
                gender = ?, 
                about = ?, 
                quote = ?, 
                updatedAt = ? 
            WHERE id = ?
        `;

        
        const params = [
            changes.img || null,
            changes.character || null,
            changes.voiceActor || null,
            changes.appearsIn || null,
            changes.aliases || null,
            changes.species || null,
            changes.gender || null,
            changes.about || null,
            changes.quote || null,
            new Date().toLocaleString("en-US", { timeZone: 'UTC' }), 
            personajeId  
        ];
        await client.execute(query, params, { prepare: true });
    
        return { status: "OK", message: "Personaje actualizado correctamente" };
    } catch (error) {
        console.error('Error al actualizar el personaje:', error);
        throw { status: 500, message: error.message };
    }
};





const deleteOnePersonaje = async (personajeId) => {
    try {
        const query = 'DELETE FROM personajes WHERE id = ?';
        await client.execute(query, [personajeId], { prepare: true });
        return { status: "OK", message: "Personaje eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar el personaje:', error);
        throw { status: 500, message: error.message };
    }
};




module.exports = {
    getAllPersonajes,
    getOnePersonaje,
    createOnePersonaje,
    updateOnePersonaje,
    deleteOnePersonaje
};
