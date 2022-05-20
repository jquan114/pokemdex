// ==========require express,ejs servers, define variables and routes ==================
const express = require('express')
const app = express()
const port = 3000
const methodOverride = require("method-override")
// let  pokemon=reqiure('./models/pokemon')

// const morgan = require('morgan')
// const pokemon = require('./models/pokemon')

//====================middle ware=================
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
// app.use(morgan('dev'))
app.use("/public", express.static("public"));

//================route intialized============

app.get("/", (req, res) => {
    res.render("index.ejs", {pokemon:pokemon})
});
//=================show route================
app.get("/pokemon", (req, res) => {
    res.send(pokemon)
});
//=================new route=================
app.get("/new", (req, res) => {
    res.render("new.ejs")
});
//=================edit route==================
app.get("/:id/edit", (req, res) => {
    const { stats } = pokemon[req.params.id]
    res.render("edit.ejs", {stats, id: req.params.id})
});
//=================index route========================
app.get("/:index", (req, res) => {
    const { id, name, img, type, stats, moves, damages, misc } = pokemon[parseInt(req.params.index)-1];
    res.render("show.ejs", {id, name, img, type, stats, index:req.params.index})
});
//==================delete route=========================
app.delete("/:index", (req, res) => {
    pokemon.splice(req.params.index, 1)
    res.redirect('/')
});

//====================post route=======================
app.post("/", (req, res) => {
    const { id, name, img, type,attack, defense, spattack, spdefense, speed } = req.body
    let stats = { attack, defense, spattack, spdefense, speed}
    let newPokemon = {id, name, img, type, stats}
    pokemon.push(newPokemon)
    res.redirect("/")
});
//===================index============================
app.put("/:index", (req, res) => {
    const {attack, defense, spattack, spdefense, speed} = req.body
    pokemon[req.params.index-1].stats = {attack, defense, spattack, spdefense, speed}
    res.redirect(`/${req.params.index}`)
})
//==============port listenining======================
app.listen(port, () => {
    console.log("Listening on port: " + port)
});