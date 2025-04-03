
import { error } from 'console';
import express from 'express';

import fs, { readFile } from 'fs'

const app = express();

const port = 3000;


// le dice al app que vas a usar json 
app.use(express.json())

app.get('/', (req, res)=>{
    fs.readFile('./html/Home.html', 'utf8', 
        (err, html)=>{
        if(err)
        {
            res.status(500).send('There was an error: ' + err)
            return
        }
        console.log("Sending page...")
        res.send(html)
        console.log("page sent!")

    })
})

app.get('/person', (req, res)=> {
    console.log("hello world")

    const person = {
        name: "Santiago",
        email: "A01029211@tec.mx",
        message: "Hello world from server" 
        }

    res.json(person)
})

app.listen(port, () => {
    console.log('Example app listening on port' + port)
})