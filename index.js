const express=require('express');

const projectRouter = require('./projects/projectRouter');
// const actionRouter = require('../actions/actionRouter');

const server=express();

server.use('/api/projects', projectRouter);


const port = 7000;
server.listen(port, ()=>console.log(`\nAPI running on port ${port}`))