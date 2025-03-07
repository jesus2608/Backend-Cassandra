
const getAllPersonajes = async (filterParams) => {
    try {
        let query = 'SELECT * FROM personajes';
        if (filterParams.gender) {
            query = `SELECT * FROM personajes WHERE gender = '${filterParams.gender}'`;
        }
        const result = await client.execute(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        throw { status: 500, message: error.message };
    }
};


const getOnePersonaje = async (personajeId) => {
    try {
        const query = 'SELECT * FROM personajes WHERE id = ?';
        const result = await client.execute(query, [parseInt(personajeId)], { prepare: true });
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        throw { status: 500, message: error.message };
    }
};


const createOnePersonaje = async (newPersonaje) => {
    try {
        const query = `
            INSERT INTO personajes (id, img, character, voiceActor, appearsIn, aliases, species, gender, about, quote) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            newPersonaje.id,
            newPersonaje.img,
            newPersonaje.character,
            newPersonaje.voiceActor,
            newPersonaje.appearsIn,
            newPersonaje.aliases,
            newPersonaje.species,
            newPersonaje.gender,
            newPersonaje.about,
            newPersonaje.quote
        ];
        await client.execute(query, params, { prepare: true });
        return { status: "OK", message: "Personaje creado correctamente" };
    } catch (error) {
        console.error('Error al crear el personaje:', error);
        throw { status: 500, message: error.message };
    }
};


const updateOnePersonaje = async (personajeId, changes) => {
    try {
        const query = `
            UPDATE personajes SET 
                img = ?, 
                character = ?, 
                voiceActor = ?, 
                appearsIn = ?, 
                aliases = ?, 
                species = ?, 
                gender = ?, 
                about = ?, 
                quote = ? 
            WHERE id = ?
        `;
        const params = [
            changes.img,
            changes.character,
            changes.voiceActor,
            changes.appearsIn,
            changes.aliases,
            changes.species,
            changes.gender,
            changes.about,
            changes.quote,
            parseInt(personajeId)
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
        await client.execute(query, [parseInt(personajeId)], { prepare: true });
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
