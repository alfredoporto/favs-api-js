const {
    mongo: { favsModel },
} = require('../../persistance');

module.exports = {
    //funciona
    getAll: async (req, res) => {
        const owner = req.query.user;
        console.log(owner);

        const favs = await favsModel
            .find({ owner })

        res.send(favs);
    },

    //funciona
    getOne: async (req, res) => {
        const owner = req.query.user;
        console.log("user id: " + owner);
        const id = req.params.id;
        console.log("fav id: " + id);

        const favs = await favsModel
            .findOne({ owner: owner })
            .select({ favs: { $elemMatch: { _id: id } } })

        res.send(favs);
    },
    //arreglar
    deleteOne: async (req, res) => {
        const { _ownerId } = req.query.user;
        const { _favId } = req.params.id;
        const deletedFav = await favsModel.updateOne(
            _ownerId,
            { $pull: { favs: { _id: _favId } } }
        );
        res.send(`${deletedFav} deleted`);
    },

    //funciona
    createOne: async (req, res) => {
        const { owner, name, favs } = req.body;
        const newFav = new favsModel({ owner, name, favs });
        await newFav.save();
        res.send(`${newFav.name} saved`);
    },

    //falta arreglar
    addFav: async (req, res) => {
        const { _id } = req.query;
        const { fav } = req.body;

        const favsUpdated = await favsModel.findByIdAndUpdate(
            _id,
            {
                $push: { favs: fav },
            },
            { useFindAndModify: false }
        );
        res.send(`${favsUpdated.name} updated`);
    }
};