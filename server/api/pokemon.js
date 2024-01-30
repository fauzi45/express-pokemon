const Router = require("express").Router();

const { request } = require("express");
const PokemonHelper = require("../helpers/pokemonHelper");
const ValidationHelper = require("../helpers/validationHelper");

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
    res.status(200).send({ message: "Pokemon berhasil ditangkap", data });
  } catch (err) {
    console.error("Gagal mendapatkan pokemon >>>>>", err.message);
    res.status(400).send({ message: err.message });
  }
};

const getMyPokemon = async (request, reply) => {
  try {
    const response = await PokemonHelper.getMyPoke();
    return reply
      .status(200)
      .send({ message: "Data Pokemon Saya berhasil didapat", data: response });
  } catch (err) {
    console.log("Data Pokemon gagal didapat");
    reply
      .status(400)
      .send({ message: "Data Pokemon gagal didapat", data: err.message });
  }
};

const releaseMyPokemon = async (request, reply) => {
  try {
    const { id } = request.params;
    const data = await PokemonHelper.releasePoke(id);
    reply
      .status(200)
      .send({ message: "Data Pokemon  berhasil di release", data });
  } catch (err) {
    console.error("Error:", err);
    reply.status(400).send({ message: err.message });
  }
};

const renamePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname } = req.body;
    const renamedPoke = await PokemonHelper.renamePoke(id, {
      nickname,
    });
    res
      .status(200)
      .send({ message: "Data Pokemon Detail berhasil diupdate", renamedPoke });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: error.message });
  }
};

Router.get("/all", allPokemon);
Router.get("/detail/:id", detailPokemon);
Router.post("/catch", catchPokemon);
Router.get("/my-pokemon", getMyPokemon);
Router.delete("/delete/:id", releaseMyPokemon);
Router.put("/rename/:id", renamePokemon);
module.exports = Router;
