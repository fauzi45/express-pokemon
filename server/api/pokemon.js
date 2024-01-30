const Router = require("express").Router();

const { request } = require("express");
const PokemonHelper = require("../helpers/pokemonHelper");

const allPokemon = async (request, reply) => {
  try {
    const response = await PokemonHelper.getPokemonList();
    return reply
      .status(200)
      .send({ message: "Data Pokemon berhasil didapat", data: response });
  } catch (err) {
    console.log("Data Pokemon gagal didapat");
    reply
      .status(400)
      .send({ message: "Data Pokemon gagal didapat", data: err.message });
  }
};

const detailPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PokemonHelper.getPokemonDetail(id);
    res
      .status(200)
      .send({ message: "Data Pokemon Detail berhasil didapat", data });
  } catch (err) {
    console.error("Gagal mendapatkan data pokemon >>>>>", err.message);
    res.status(400).send({ message: err.message });
  }
};

const catchPokemon = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await PokemonHelper.catchPokemon(name);
    res
      .status(200)
      .send({ message: "Pokemon berhasil ditangkap", data });
  } catch (err) {
    console.error("Gagal mendapatkan pokemon >>>>>", err.message);
    res.status(400).send({ message: err.message });
  }
};

Router.get("/all", allPokemon);
Router.get("/:id", detailPokemon);
Router.post("/catch", catchPokemon);

module.exports = Router;
