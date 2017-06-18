const uuid = require('uuid/v4');
const _ = require('underscore');

const cartoons = [];

function retrieveAllCartoons(done) {
  done(null, cartoons);
}

function createCartoon({ name, creator }, done) {
  const id = uuid();
  const newCartoon = { id, name, creator };
  cartoons.unshift(newCartoon);
  done(null, newCartoon);
}

function retrieveCartoon(id, done) {
  done(null, cartoons.find(cartoon => cartoon.id === id));
}

function updateCartoon(id, { name, creator }, done) {
  done(null, _.extend(cartoons.find(cartoon => cartoon.id === id), { name, creator }));
}

function deleteCartoon(id, done) {
  const cartoonForDeletion = cartoons.find(cartoon => cartoon.id === id);
  if (!cartoonForDeletion) { done(null, null); return; }
  const index = cartoons.indexOf(cartoonForDeletion);
  cartoons.splice(index, 1);
  done(null, cartoonForDeletion);
}

module.exports = {
  retrieveAllCartoons,
  createCartoon,
  retrieveCartoon,
  updateCartoon,
  deleteCartoon,
};
