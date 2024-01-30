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

Router.get("/all", allPokemon);

module.exports = Router;
