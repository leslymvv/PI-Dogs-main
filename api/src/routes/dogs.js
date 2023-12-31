const { Router } = require("express");

// Importar todos los routers
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const router = Router();

const getBd = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
            attributes:[],
        },
    },
})
};

const getApi = async () => {
    const apiUrl = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const apiInfo = await apiUrl.data.map((e) => {
        
        return {
            id: e.id,
            image: e.image.url,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.imperial,
            height: e.height.imperial,
            life_span: e.life_span,
            createInBd: false
        };
        });
        return apiInfo;
};

const getBreeds = async () => {
    const apiInfo = await getApi();
    const bdInfo = await getBd();
    const allInfo = apiInfo.concat(bdInfo);
    return allInfo;
};

router.get("/", async (req, res) => {
    const { name } = req.query;
    console.log(name)
    const allBreeds = await getBreeds();

    if (!name) {
        res.status(200).json(allBreeds);
    } else {
        const filtrados = allBreeds.filter((e)  => {
            return e.name.toLowerCase().startsWith(name.toLowerCase());
        });
        filtrados.length > 0
            ? res.status(200).json(filtrados)
            : res.status(400).send("Raza no encontrada");
    }
});

router.get("/:id", async (req, res) => { 
    const id = req.params.id;
    const breeds = await getBreeds();
                
    if (id) {
        const filtrados = await breeds.filter((e) =>  e.id == id);
        filtrados.length
            ? res.status(200).json(filtrados)
            : res.status(404).send("Raza no encontrada por ID");
        }
})

module.exports = router;