const express = require('express');
const projectDb=require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

//GET /api/projects/
router.get('/', (req, res)=>{
    projectDb.get()
    .then(projects=>{res.status(200)
    .json(projects)
    })
    .catch(error=>{res.status(500)
    .json({error: "The projects could not be retrieved"})
    })
})

//GET by id /api/projects/:id
router.get('/:id', (req, res) => {
    
    const {id} = req.params;
    
    projectDb.get(id)
    .then(project => {
        if (project) {
        res.status(200)
        .json(project);
        } else {
            res.status({message: "The project with the specified ID does not exist."})
        }
    })
    .catch(error => {res.status(500)
        .json({message: "The project info could not be retrieved."})
    })
})

//POST /api/projects/
router.post('/', async (req, res) => {
    const {name, description} = req.body;
    
    if (!name || !description) {
    res.status(400)
    .json({message: "Please provide a name and description for the new project."})
    } else {
        try {
        const projectInfo = req.body;
        const projectId  =await projectDb.insert(projectInfo);
        res.status(201).json(projectId);
        } catch (error) {
        res.status(500).json({error: "An error occurred while saving this project."})
    }
    }
})

//UPDATE /api/projects/:id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.name || !changes.description) {res.status(400)
        .json({error: "Please provide the updated project's name and description."})
    } else {
        projectDb.update(id, changes)
        .then(project => {
            if (project) {
            res.status(200)
            .json(project);
            } else {
                res.status(404)
                .json({message: "The project with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500)
            .json({error: "The project info could not be modified."})
        })
    }
})

//DELETE /api/projects/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    projectDb.remove(id)
    .then(count=>{
        if (count) {
        res.status(200)
        .json(count);
        } else {
            res.status(404)
            .json({message: "The project with the specififed ID does not exist."})
        }
    })
    .catch(error=>{
        res.status(500)
        .json({error: "The project could not be removed."})
    })
})

//return list of all actions for the specified project
// /api/projects/:id/actions
router.get('/:id/actions', (req, res) => {
    const {id} =req.params;

    projectDb.getProjectActions(id)
    .then(actions=>{
        if(actions) {
        res.status(200)
    .json(actions)
        } else {
            res.status(404).json({message: "The project with the specified ID does not exist."})
        }
    })
    .catch(error=>{res.status(500)
    .json({error: "The project's actions could not be retrieved."})})
});

module.exports = router;