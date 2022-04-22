const express = require('express');
const router = express.Router();
const favsSchema = require('../schemas/favs');
const validate = require('../middlewares/validateData');
const validateAuth = require('../middlewares/validateAuth');

const {
    getAll,
    getOne,
    deleteOne,
    createOne,
    addFav
} = require('../controllers/favs');

router.get('/', validateAuth, getAll);
router.get('/:id', validateAuth, getOne);
router.put('/:id', validateAuth, addFav);
router.post('/', validateAuth, createOne);
router.delete('/:id', validateAuth, deleteOne);

module.exports = router;