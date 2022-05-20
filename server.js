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
    console.log(`params ${req.params.id}`)
    const { stats } = pokemon[req.params.id]
    
    res.render("edit.ejs",// pass in an object that contains and render views/edit.ejs /
     {stats, id: req.params.id})
});

//==================DELETE ROUTE=========================
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1)//redirect back to index route
    res.redirect('/pokemon')
});

//====================POST ROUTE=======================
app.post("/pokemon", (req, res) => {
    const { id, name, img, type, attack, defense, spattack, spdefense, speed } = req.body
    let stats = { attack, defense, spattack, spdefense, speed}
    let newPokemon = {id, name, img, type, stats}
    pokemon.push(newPokemon)
    res.redirect("/pokemon")
});
//=================INDEX ROUTE========================
app.get("pokemon/", (req, res) => {
    const { name, img, type, stats, moves, damages, misc } = pokemon[(req.params.id)];
    const { id }= pokemon[(req.params.index.id)]
    res.render("show.ejs", {id, name, img, type, stats, index:req.params.index.id})
});
//===================INDEX===========================
app.put("/pokemon", (req, res) => {
    const {attack, defense, spattack, spdefense, speed} = req.body
    pokemon[req.params.index-1].stats = {attack, defense, spattack, spdefense, speed}
    res.redirect(`/pokemon${req.params.index}`)
})
//==============port listenining======================
app.listen(port, () => {
    console.log("Listening on port: " + port)
});