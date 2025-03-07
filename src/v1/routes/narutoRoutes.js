
const express = require("express");
const apicache = require("apicache");
const personajeController = require("../../controllers/personajeController");
const router = express.Router();
const cache = apicache.middleware;
router.get("/", personajeController.getAllPersonajes); 
router.get("/:personajeId", personajeController.getOnePersonaje);
router.post("/", personajeController.createNewPersonaje);
router.patch("/:personajeId", personajeController.updateOnePersonaje);
router.delete("/:personajeId", personajeController.deleteOnePersonaje);

module.exports = router;