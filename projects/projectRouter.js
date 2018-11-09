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
module.exports = router;