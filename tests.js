import assert from 'assert';
import Joi from 'joi';

const mealA = {
  fortuneCookies: 5,
  prawnToast: 'yum',
  chowMein: true,
};

const mealASchema = {
  fortuneCookies: Joi.number(),
  prawnToast: Joi.string(),
  chowMein: Joi.boolean(),
};

describe('when I try and make a decision on what chinese meal to eat', () => {
  it('meal a should be valid', (done) => {
    Joi.validate(mealA, mealASchema, (err, value) => {
      assert.deepEqual(value, mealA);
      done();
    });
  });
});
