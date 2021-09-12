import sirv from 'sirv';
import express from 'express';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express() // You can also use Express

app.use(sirv('static', { dev }), sapper.middleware())

// API Modules
// import nationalRail from './server/routes/nationalRail';

// app.use('/api/v1/nr', nationalRail);

app.listen(PORT, () => {
	console.log( `Server started at http://localhost:${ PORT }` );
})