const _ = require("lodash");
const fs = require("fs");

const general = require("../helpers/generalHelper");
const baseUrl = "https://pokeapi.co/api/v2/";
const localUrl = (__dirname, "./assets/pokemon.json");

const getPokemonList = async () => {
  try {
    const response = await general.commonHttpRequest({
      method: "get",
      baseURL: baseUrl,
      url: "pokemon/",
    });
    return Promise.resolve(response.results);
  } catch (error) {
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
    throw error;
  }
};

const catchPokemon = async (name) => {
  try {
    const isCaught = Math.random() < 0.5;
    if (isCaught) {
      const dataLocal = fs.readFileSync(localUrl, "utf-8");
      const jsonData = JSON.parse(dataLocal);

      const response = await general.commonHttpRequest({
        method: "get",
        baseURL: baseUrl,
        url: `pokemon/${name.toLowerCase()}`,
      });
      const pokemonSame = jsonData.filter(
        (pokemon) => pokemon.name === name.toLowerCase()
      );
      if (!pokemonSame) {
        throw new Error("Pokemon with this name doesn't exist");
      }
      const fibonacciCount = general.fibonacci(pokemonSame.length - 1);
      const latestId = jsonData.reduce((maxId, pokemon) => Math.max(maxId, pokemon.id), 0) + 1;
      const data = {
        id: latestId,
        name: response.name,
        nickname: `${response.name}${
          pokemonSame.length === 0 ? "" : "-" + fibonacciCount
        }`,
      };

      jsonData.push(data);
      fs.writeFileSync(localUrl, JSON.stringify(jsonData));
      return Promise.resolve(data);
    } else {
      throw new Error("Pokemon failed to be captured");
    }
  } catch (error) {
    throw error;
  }
};

const getMyPoke = async () => {
  try {
    const dataLocal = fs.readFileSync(localUrl, "utf-8");
    const jsonData = JSON.parse(dataLocal);
    return Promise.resolve(jsonData);
  } catch (error) {
    throw error;
  }
};

const releasePoke = async (id) => {
  try {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (general.isPrime(randomNumber)) {
      const data = fs.readFileSync(localUrl, "utf-8");
      const jsonData = JSON.parse(data);
      const release = jsonData.findIndex((poke) => String(poke.id) !== id);
      if (!release) {
        throw new Error("Release Pokemon with this id doesn't exist");
      }
      fs.writeFileSync(localUrl, JSON.stringify(release));
      return Promise.resolve(release);
    } else {
      throw new Error("The opposite number is not prime, please try again");
    }
  } catch (error) {
    throw error;
  }
};

const renamePoke = async (id, updatedDatas) => {
  try {
    const { nickname } = updatedDatas;
    const data = fs.readFileSync(localUrl, "utf-8");
    const jsonData = JSON.parse(data);
    const index = jsonData.findIndex((pokemon) => String(pokemon.id) === id);
    if (index === -1) {
      throw new Error("Rename Pokemon with this id doesn't exist");
    }
    const pokemonSame = jsonData.filter((pokemon) =>
      pokemon.nickname.includes(nickname.toLowerCase())
    );
    if (!pokemonSame) {
      throw new Error("Pokemon with this nickname doesn't exist");
    }
    const fibonacciCount = general.fibonacci(pokemonSame.length - 1);
    const updatedPokemon = {
      ...jsonData[index],
      nickname:
        `${nickname.toLowerCase()}${
          pokemonSame.length === 0 ? "" : "-" + fibonacciCount
        }` || jsonData[index].nickname,
    };

    jsonData[index] = updatedPokemon;
    fs.writeFileSync(localUrl, JSON.stringify(jsonData));
    return updatedPokemon;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPokemonList,
  getPokemonDetail,
  catchPokemon,
  getMyPoke,
  releasePoke,
  renamePoke,
};
