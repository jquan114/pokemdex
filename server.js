const express = require('express');
const app = express();
const port =3000;

const pokemon = require("./models/pokemon")
console.log(pokemon)



// index route
app.get('/',(req,res) => {
    res.render('index.ejs',{ data:pokemon });
});





//show route
app.get('/pokemon/:indexOfPokemonArray', (req,res) => {
    res.render('show.ejs',{ data: pokemon[req.params.id]});
});




//new route
app.get('/pokemon/new', (req,res) => {
    res.render('new.ejs');
});




//edit route
app.get('/pokemon/:indexOfPokemonArray/edit',(req,res) => {
    res.render('edit.ejs', {
        poke: pokemon[req.params.indexOfPokemonArray],
        index: req.params.indexOfPokemonArray,
    });
});


//create route
app.post('/pokemon',(req,res) => {
    if(req.body.name.img === 'true') {
        req.body.name.img = true;
    } else {
        req.body.name.img = false;
    }
    pokemon.push(req.body);
    console.log(pokemon);
    res.redirect('/pokemon');
});




//update route
app.put('/pokemon/:indexOfPokemonArray',(req,res) => {
    if(req.body.name.img === 'true'){
        req.body.name.img = true;
    } else {
        req.body.name.img = false;
    }
    pokemon[req.params.indexOfPokemonArray]= req.body;

    res.redirect('/pokemon');
});




//destroy route
app.delete('/pokemon/:indexOfPokemonArray',(req,res) => {
    pokemon.splice(req.params.indexOfPokemonArray, 1);
    res.redirect('/pokemon');
});



//tell the app to listen
app.listen(port,() => {
     console.log(`listening on the port`, port)
 });





