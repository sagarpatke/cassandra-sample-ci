/* eslint-env node, mocha */
/* eslint prefer-arrow-callback: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint func-names: ["off"] */

const expect = require('chai').expect;
const request = require('supertest');
const async = require('async');
const app = require('../../app');

describe('/cartoons api', function () {
  let cartoonId;
  it('should get an empty list of cartoons', function (done) {
    request(app)
      .get('/api/v1/cartoons')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.be.an('array').that.is.empty;
        done();
      });
  });
  it('should fail to create a cartoon without a name', function (done) {
    request(app)
      .post('/api/v1/cartoons')
      .send({ author: 'Walt Disney' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.have.property('message').to.equal('Cannot create cartoon without a name');
        done();
      });
  });
  it('should create a cartoon', function (done) {
    request(app)
      .post('/api/v1/cartoons')
      .send({ name: 'Mickey Mouse', creator: 'Walt Disny' })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.have.property('id').and.to.be.a('string').and.to.exist;
        cartoonId = body.id;
        expect(body).to.have.property('name').and.to.equal('Mickey Mouse');
        expect(body).to.have.property('creator').and.to.equal('Walt Disny');
        done();
      });
  });
  it('should retrieve a cartoon', function (done) {
    request(app)
      .get(`/api/v1/cartoons/${cartoonId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.have.property('id').and.to.equal(cartoonId);
        expect(body).to.have.property('name').and.to.equal('Mickey Mouse');
        expect(body).to.have.property('creator').and.to.equal('Walt Disny');
        done();
      });
  });
  it('should retrieve all cartoons', function (done) {
    request(app)
      .get('/api/v1/cartoons')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.be.an('array').and.has.lengthOf(1);
        expect(body[0]).to.have.property('id').and.equal(cartoonId);
        expect(body[0]).to.have.property('name').and.equal('Mickey Mouse');
        expect(body[0]).to.have.property('creator').and.equal('Walt Disny');
        done();
      });
  });
  it('should update a cartoon', function (done) {
    async.series([
      (callback) => {
        request(app)
          .put(`/api/v1/cartoons/${cartoonId}`)
          .send({ name: 'Mickey Mouse', creator: 'Walt Disney' })
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, { body }) => {
            if (err) { done(err); return; }
            expect(body).to.have.property('id').and.equal(cartoonId);
            expect(body).to.have.property('name').and.equal('Mickey Mouse');
            expect(body).to.have.property('creator').and.equal('Walt Disney');
            callback();
          });
      }, (callback) => {
        request(app)
          .get(`/api/v1/cartoons/${cartoonId}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, { body }) => {
            if (err) { done(err); return; }
            expect(body).to.have.property('id').and.to.equal(cartoonId);
            expect(body).to.have.property('name').and.to.equal('Mickey Mouse');
            expect(body).to.have.property('creator').and.to.equal('Walt Disney');
            done();
          });
      },
    ], done);
  });
  it('should delete a cartoon', function (done) {
    request(app)
      .delete(`/api/v1/cartoons/${cartoonId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.have.property('id').and.equal(cartoonId);
        expect(body).to.have.property('name').and.equal('Mickey Mouse');
        expect(body).to.have.property('creator').and.equal('Walt Disney');
        done();
      });
  });
  it('should not delete a cartoon that is already deleted', function (done) {
    request(app)
      .delete(`/api/v1/cartoons/${cartoonId}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, { body }) => {
        if (err) { done(err); return; }
        expect(body).to.have.property('message').and.to.equal(`Cartoon with id ${cartoonId} could not be found`);
        done();
      });
  });
});
