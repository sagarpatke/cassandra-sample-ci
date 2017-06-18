const router = require('express').Router();

const controller = require('./cartoons.controller');

router.post('/', controller.createCartoon);
router.get('/', controller.retrieveAllCartoons);
router.get('/:id', controller.retrieveCartoon);
router.put('/:id', controller.updateCartoon);
router.delete('/:id', controller.deleteCartoon);

module.exports = router;
