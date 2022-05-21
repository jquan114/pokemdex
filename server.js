// ==========require express,ejs servers, define variables and routes ==================
const express = require('express');
const app = express();
const port = 3000
const pokemon = require('./models/pokemon');
//npm install method-override
const methodOverride = require("method-override");
// let  pokemon=reqiure('./models/pokemon')


// const morgan = require('morgan')
// const pokemon = require('./models/pokemon')

//====================MIDDLEWARE=================
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan('dev'))
app.use("/public", express.static("public"));            
app.use((req,res,next) => {
    console.log('I run all routes')
    
    next()
});

//================ROUTE INITIALIZED============

app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {pokemon:pokemon})
});
//=================SHOW ROUTE================
app.get("/pokemon/:id", (req, res) => {
    res.render('show.ejs',{pokemon:pokemon[req.params.id],index:req.params})
});
//=================NEW ROUTE=================
app.get("/new", (req, res) => {
    res.render("new.ejs")
});
//=================EDIT ROUTE==================
app.get("/pokemon/:id/edit", (req, res) => { 
    console.log(req.params)
    // console.log(req.params)
    // console.log(`params ${req.params.id}`)
    const pokemon1 = pokemon.find(
        (item) => {
         return item.id === req.params.id;
        }
    )
    // pass in an object that contains and render views/edit.ejs /
    
    res.render("edit.ejs",
     {
         index:pokemon1.id,
         pokemon:pokemon1
     })
     
});


//==================DELETE ROUTE=========================
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1)//redirect back to index route
    res.redirect('/pokemon')                 
});

//====================POST ROUTE=======================
app.post("/pokemon", (req, res) => {
    pokemon.push(req.body);
    res.redirect("/pokemon")// post page /pokemon
});
    // const { id, name, img, type, attack, defense, spattack, spdefense, speed } = req.body
    // let stats = { attack, defense, spattack, spdefense, speed}
    // let newPokemon = {id, name, img, type, stats}
    // pokemon.push(newPokemon)//<----------made changes to my pose routee
//=================INDEX ROUTE========================
app.get("pokemon/", (req, res) => {
    const { name, img, type, stats, moves, damages, misc } = pokemon[(req.params.id)];
    const { id }= pokemon[(req.params.index.id)]
    res.render("show.ejs", {id, name, img, type, stats, index:req.params.index.id}) // render back to showshowpage.ejs
});
//===================UPDATE ROUTE===========================
app.put("/pokemon", (req, res) => {
    req.body.stats = {};
    req.body.stats.hp = req.body.hp;
    req.body.stats.attack = req.body.attack;
    req.body.stats.defense = req.body.defense;
    console.log(req.body);
    pokemon[req.params.id] =req.body;
    res.redirect('/pokemon/')
});
    // const {attack, defense, spattack, spdefense, speed} = req.body
    // pokemon[req.params.index-1].stats = {attack, defense, spattack, spdefense, speed}
    // res.redirect(`/pokemon${req.params.index}`)

//==============PORT LISTENING======================
app.listen(port, () => {
    console.log("Listening on port: " + port)
});