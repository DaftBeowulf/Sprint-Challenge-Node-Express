const express=require('express');
const cors = require('cors');

const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server=express();

server.use(cors());

server.use('/api/projects', projectRouter);

server.use('/api/actions', actionRouter);

const port = 7000;
server.listen(port, ()=>console.log(`\nAPI running on port ${port}`))