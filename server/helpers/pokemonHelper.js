const _ = require("lodash");
const fs = require("fs");
const general = require("../helpers/generalHelper");
const dataPath = (__dirname, "./assets/pokemon.json");

const getPokemonList = async () => {
  try {
    const response = await general.commonHttpRequest({
      method: "get",
      baseURL: "https://pokeapi.co/api/v2/",
      url: "pokemon/",
    });
    console.log(response.results);
    return Promise.resolve(response.results);
  } catch (error) {
    console.log(error, "<<<<< ERROR GET SISWA");
    throw error;
  }
};

module.exports = {
  getPokemonList,
};
