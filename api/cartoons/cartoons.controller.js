const { cartoonsDAO } = require('../../dao');


function retrieveAllCartoons(req, res, next) {
  cartoonsDAO.retrieveAllCartoons((err, cartoons) => {
    if (err) { next(err); return; }
    res.status(200).json(cartoons);
  });
}

function createCartoon(req, res, next) {
  const { name, creator } = req.body;

  if (!name || !creator) { next(new Error('Cannot create cartoon without a name')); return; }
  cartoonsDAO.createCartoon({ name, creator }, (err, createdCartoon) => {
    if (err) { next(err); return; }
    res.status(201).json(createdCartoon);
  });
}

function retrieveCartoon(req, res, next) {
  const { id } = req.params;
  cartoonsDAO.retrieveCartoon(id, (err, cartoon) => {
    if (err) { next(err); return; }
    res.status(200).json(cartoon);
  });
}

function updateCartoon(req, res, next) {
  const { id } = req.params;
  const { name, creator } = req.body;
  cartoonsDAO.updateCartoon(id, { name, creator }, (err, updatedCartoon) => {
    if (err) { next(err); return; }
    res.status(200).json(updatedCartoon);
  });
}

function deleteCartoon(req, res, next) {
  const { id } = req.params;
  cartoonsDAO.deleteCartoon(id, (err, deletedObject) => {
    if (err) { next(err); return; }
    if (!deletedObject) { res.status(404).send({ message: `Cartoon with id ${id} could not be found` }); return; }
    res.status(200).json(deletedObject);
  });
}

module.exports = {
  retrieveAllCartoons,
  createCartoon,
  retrieveCartoon,
  updateCartoon,
  deleteCartoon,
};
