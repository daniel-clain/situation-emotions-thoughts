import * as express from 'express'
const app = express();
app.use(express.static('dist'));
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))


