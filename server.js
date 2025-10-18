const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const { fileURLToPath } = require('url');

// create an express object
const app = express();

// localhost:8000/pokemons
// apply middleware to parse JSON
app.use(express.json());

// read data from pokemons.json
const pokemons = JSON.parse(fs.readFileSync('./pokemons.json', { encoding: 'utf-8' }));

app.get("/pokemons", (req, res) => {
    res.send(pokemons);
});

app.get("/pokemons/:id", (req, res) => {
    const id = req.params.id;
    const pokemon = pokemons.find((p) => p.id === id);
    res.send(pokemon);
});

app.post("/pokemons", (req, res) => {
    
    const pokemon = req.body;
    pokemon.id = crypto.randomUUID();
    console.log(pokemon);

    fs.writeFileSync(fileURLToPath,JSON.stringify(pokemon), { encoding: 'utf-8' });

    res.status(201).send({ message: "POST Request Success" });
});

app.put("/pokemons/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.send({ message: "PUT Request Success" });
});

app.delete("/pokemons/:id",randomMiddleware, (req, res) => {
    res.send({ message: "DELETE Request Success" });
});

// create and start a server
app.listen(8000, () => {
    console.log('Server is up and running on port 8000');
});



// custom middlewere

function randomMiddleware(req, res, next) {
    if(Number(req.params.id)<10)
    {
        res.status(401).send({message:"wrong id"})
    }

    next();
}