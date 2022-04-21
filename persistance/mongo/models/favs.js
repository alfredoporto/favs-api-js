const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId

const FavSchema = new Schema(
    {
        title: String,
        description: String,
        link: String,
    }
);

const schema = new Schema(
    {
        owner: { type: ObjectID, required: true, ref: 'users' },
        name: { type: String, required: true },
        favs: [{ type: FavSchema }],
    },
    { timestamps: true }
);

const model = mongoose.model('favs', schema);
module.exports = model;