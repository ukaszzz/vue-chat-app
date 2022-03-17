import * as express from 'express';
import * as cors from 'cors'

const app = express();

app.use(cors());


app.listen(3000, 'localhost', ()=> {
    console.log('listen on 3000')
})