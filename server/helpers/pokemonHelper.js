const _ = require("lodash");
const fs = require("fs");
const general = require("../helpers/generalHelper");
const dataPath = (__dirname, "./assets/pokemon.json");

const baseUrl = "https://pokeapi.co/api/v2/";


const getPokemonList = async () => {
  try {
    const response = await general.commonHttpRequest({
      method: "get",
      baseURL: baseUrl,
      url: "pokemon/",
    });
    console.log(response.results);
    return Promise.resolve(response.results);
  } catch (error) {
    console.log(error, "<<<<< ERROR GET pokemon");
    throw error;
  }
};

const getPokemonDetail = async (id) => {
  try {
    const response = await general.commonHttpRequest({
      method: "get",
      baseURL: baseUrl,
      url: `pokemon/${id}`,
    });
    const data = ({
      id: response.id,
      name: response.name,
    })
    console.log(data);
    return Promise.resolve(data);
  } catch (error) {
    console.log("Gagal mendapatkan data pokemon");
    throw error; 
  }
};


module.exports = {
  getPokemonList,
  getPokemonDetail,
};
