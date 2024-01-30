const Router = require("express").Router();

const { request } = require("express");
const PokemonHelper = require("../helpers/pokemonHelper");
const ValidationHelper = require("../helpers/validationHelper");

const allPokemon = async (req, res) => {
  try {
    const response = await PokemonHelper.getPokemonList();
    return res
      .status(200)
      .send({ message: "Pokemon data received successfully", data: response });
  } catch (err) {
    res.status(400).send({
      message: "Pokemon data failed to be received",
      data: err.message,
    });
  }
};

const detailPokemon = async (req, res) => {
  try {
    ValidationHelper.detailPokemonValidation(req.query);
    const { id } = req.query;
    const data = await PokemonHelper.getPokemonDetail(id);
    res
      .status(200)
      .send({ message: "Pokemon detail data successfully received", data });
  } catch (err) {
    res.status(400).send({
      message: "Failed to get pokemon data",
      data: err.message,
    });
  }
};

const catchPokemon = async (req, res) => {
  try {
    ValidationHelper.catchPokemonValidation(req.body);
    const { name } = req.body;
    const data = await PokemonHelper.catchPokemon(name);
    res.status(200).send({ message: "Pokemon successfully captured", data });
  } catch (err) {
    res.status(400).send({
      message: "Pokemon failed to be captured",
      data: err.message,
    });
  }
};

const getMyPokemon = async (req, res) => {
  try {
    const response = await PokemonHelper.getMyPoke();
    return res.status(200).send({
      message: "My Pokemon data received successfully",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "My Pokemon data failed to be received",
      data: err.message,
    });
  }
};

const releaseMyPokemon = async (req, res) => {
  try {
    ValidationHelper.releasePokemonValidation(req.query);
    const { id } = req.query;
    const data = await PokemonHelper.releasePoke(id);
    res
      .status(200)
      .send({ message: "Pokemon data successfully released", data });
  } catch (err) {
    res.status(400).send({
      message: "Pokemon data failed to release",
      data: err.message,
    });
  }
};

const renamePokemon = async (req, res) => {
  try {
    const { id } = req.query;
    const { nickname } = req.body;
    ValidationHelper.renamePokemonValidation({ id, nickname });
    const renamedPoke = await PokemonHelper.renamePoke(id, {
      nickname,
    });
    res
      .status(200)
      .send({ message: "Pokemon data successfully renamed", renamedPoke });
  } catch (err) {
    res.status(400).send({
      message: "Pokemon data failed to be renamed",
      data: err.message,
    });
  }
};

Router.get("/all", allPokemon);
Router.get("/detail", detailPokemon);
Router.post("/catch", catchPokemon);
Router.get("/my-pokemon", getMyPokemon);
Router.delete("/release", releaseMyPokemon);
Router.put("/rename", renamePokemon);
module.exports = Router;
