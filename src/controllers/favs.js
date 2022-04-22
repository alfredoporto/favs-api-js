const {
    mongo: { favsModel },
} = require('../../persistance');

module.exports = {
    /*
        retrieve all favs lists given a user
    */
    getAll: async (req, res) => {
        const owner = req.query.user;
        console.log(owner);

        const favs = await favsModel
            .find({ owner })

        res.send(favs);
    },

    /*
        retrieve a specific favs list of a user
    */
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

    /*
        delete one fav element of a fav list of a user
    */
    deleteOne: async (req, res) => {
        const { user: _ownerId } = req.query;
        const { id: _favId } = req.params;
        console.log(_ownerId, _favId);
        const deletedFav = await favsModel.findByIdAndUpdate(
            _ownerId,
            { $pull: { favs: { _id: _favId } } },
            { new: true }
        );
        res.send(`${deletedFav} deleted`);
    },

    /*
        create a list of favs for a user
    */
    createOne: async (req, res) => {
        const { owner, name, favs } = req.body;
        const newFav = new favsModel({ owner, name, favs });
        await newFav.save();
        res.send(`${newFav.name} saved`);
    },

    /*
        add a fav to the array of favs of a specific list of a user
    */
    addFav: async (req, res) => {
        const { id } = req.params;
        console.log("favs id: " + id);
        const { fav } = req.body;
        console.log("fav to be pushed: " + JSON.stringify(fav));

        const favsUpdated = await favsModel
            .findByIdAndUpdate(
                id,
                { $push: { favs: fav } },
                { useFindAndModify: false }
            );
        res.send(`${favsUpdated.name} updated`);
    }
};