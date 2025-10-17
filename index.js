const http = require('http');
const fs = require('fs');
const url = require('url');

// Read all Pokémons from pokemons.json
const pokemons = JSON.parse(fs.readFileSync('./pokemons.json', { encoding: 'utf-8' }));

// Create a server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Set header for JSON response
  res.setHeader('Content-Type', 'application/json');

  // GET all Pokémons
  if (pathname === '/pokemons' && req.method === 'GET' && !query.id) {
    res.end(JSON.stringify(pokemons));
  }

  // GET single Pokémon by id
  else if (pathname === '/pokemons' && req.method === 'GET' && query.id) {
    const id = query.id;
    const selectedPokemon = pokemons.find(p => p.id === id);

    if (selectedPokemon) {
      res.end(JSON.stringify(selectedPokemon));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Pokemon not found' }));
    }
  }

  // Route not found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start server
server.listen(8000, () => {
  console.log('Server up and running at http://localhost:8000');
});
