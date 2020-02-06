var express = require('express');
var router = express.Router();

//importacion de funciones
const {getProjects, createProjects, getProjectsById, deleteProject, updateProject} = require('../controllers/app.controller');

//endpoints
router.get('/', getProjects);
router.post('/', createProjects);
router.get('/:id', getProjectsById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);


module.exports = router;