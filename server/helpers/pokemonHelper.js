const _ = require("lodash");
const fs = require("fs");
const general = require("../helpers/generalHelper");
const dataPath = (__dirname, "./assets/pokemon.json");

const baseUrl = "https://pokeapi.co/api/v2/";
const localUrl = (__dirname, "./assets/pokemon.json");

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
    const data = {
      id: response.id,
      name: response.name,
    };
    return Promise.resolve(data);
  } catch (error) {
    console.log("Gagal mendapatkan data pokemon");
    throw error;
  }
};

const catchPokemon = async (name) => {
  try {
    const isCaught = Math.random() < 1;
    if (isCaught) {
      let fibo = 0;
      const dataLocal = fs.readFileSync(localUrl, "utf-8");
      const jsonData = JSON.parse(dataLocal);

      const response = await general.commonHttpRequest({
        method: "get",
        baseURL: baseUrl,
        url: `pokemon/${name}`,
      });
      const pokemonSame = jsonData.filter((pokemon) => pokemon.name === name);
      if (pokemonSame) {
        fibo = fibo + 1;
      }
      const data = {
        id: jsonData.length + 1,
        name: response.name,
        nickname: `${response.name}-${fibo}`,
      };

      jsonData.push(data);
      fs.writeFileSync(localUrl, JSON.stringify(jsonData));
      return Promise.resolve(data);
    } else {
      console.log("gagal");
      throw new Error("Gagal mendapatkan pokemon");
    }
  } catch (error) {
    console.log("Gagal mendapatkan pokemon");
    throw error;
  }
};

const getMyPoke = async () => {
  try {
    const dataLocal = fs.readFileSync(localUrl, "utf-8");
    const jsonData = JSON.parse(dataLocal);
    return Promise.resolve(jsonData);
  } catch (error) {
    console.log(error, "<<<<< ERROR GET My pokemon");
    throw error;
  }
};

const releasePoke = async (id) => {
  try {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (general.isPrime(randomNumber)) {
      const data = fs.readFileSync(localUrl, "utf-8");
      const jsonData = JSON.parse(data);
      const release = jsonData.filter((poke) => String(poke.id) !== id);
      if (!release) {
        throw new Error("Gagal Release pokemon");
      }
      fs.writeFileSync(dataPath, JSON.stringify(release));
      return Promise.resolve(release);
    } else {
      throw new Error("Number bukan prima, silahkan ulang kembali");
    }
  } catch (error) {
    console.log("Gagal mendapatkan data Pokemon");
    throw error;
  }
};

module.exports = {
  getPokemonList,
  getPokemonDetail,
  catchPokemon,
  getMyPoke,
  releasePoke
};
