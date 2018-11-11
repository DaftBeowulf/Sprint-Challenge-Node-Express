const express = require('express');
const actionDb  =require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');
const router=express.Router();

router.use(express.json());

//GET /api/actions/
router.get('/', (req, res)=>{
    actionDb.get()
    .then(actions=>{res.status(200)
    .json(actions)
    })
    .catch(error=>{res.status(500)
    .json({error: "The actions could not be retrieved"})
    })
})

//GET by id /api/actions/:id
router.get('/:id', (req, res) => {
    
    const {id} = req.params;
    
    actionDb.get(id)
    .then(action => {
        if (action) {
        res.status(200)
        .json(action);
        } else {
            res.status({message: "The action with the specified ID does not exist."})
        }
    })
    .catch(error => {res.status(500)
        .json({message: "The action info could not be retrieved."})
    })
})

//POST /api/actions/
router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body;
//first check to make sure req body has all necessary pieces    
    if (!project_id || !description || !notes) {
    res.status(400)
    .json({message: "Please provide the notes and description for the new action, as well as the ID of the associated project."})
    } else {
//run the submitted project_id through projectDb to first make sure a project with that ID exists
        projectDb.get(project_id)
        .then(project=>{
            if(project) {
                //if it exists, then run the try/catch block for actionDb.insert
                try {
                    const actionInfo = req.body;
                    actionDb.insert(actionInfo);
                    res.status(201).json(req.body);
                    } catch (error) {
                    res.status(500).json({error: "An error occurred while saving this action."})
                }
            } else {
                res.status(404).json({message: "The action with that ID does not exist."})
            }
        })
        .catch(error=>{res.status(404).json({message: "The project with that ID does not exist."})})
    }
})

//UPDATE /api/actions/:id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.project_id || !changes.description || !changes.notes) {res.status(400)
        .json({error: "Please provide the updated action's name, description, and the ID of the associated project."})
    } else {
//same as POST, first make sure the submitted project_id matches one that currently exists in projectDb
projectDb.get(changes.project_id)
.then(project=>{
    if (project){
        actionDb.update(id, changes)
        .then(action => {
            if (action) {
            res.status(200)
            .json(action);
            } else {
                res.status(404)
                .json({message: "The action with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500)
            .json({error: "The action info could not be modified."})
        })
    } else {
        res.status(500).json({message: "The project with that submitted project ID could not be retrieved."})
    }
})
        .catch(error =>{
            res.status(404).json({message: "The project with the specified project ID does not exist."})
        })

    }
})

//DELETE /api/actions/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    actionDb.remove(id)
    .then(count=>{
        if (count) {
        res.status(200)
        .json(count);
        } else {
            res.status(404)
            .json({message: "The action with the specififed ID does not exist."})
        }
    })
    .catch(error=>{
        res.status(500)
        .json({error: "The action could not be removed."})
    })
})

module.exports = router;