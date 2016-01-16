import assert from 'assert';
import Joi from 'joi';

const mealA = {
  fortuneCookies: 5,
  prawnToast: 'yum',
  chowMein: true,
};

const mealASchema = {
  fortuneCookies: Joi.number().integer(),
  prawnToast: Joi.string().required(),
  chowMein: Joi.boolean(),
};

const mealB = {
  squid: 10,
  seaweed: 'crispy',
  dishOfTheDay: 'fish',
  fooYung: 'egg',
};

const mealBSchema = {
  squid: Joi.number(),
  seaweed: Joi.string().allow('crispy'),
  dishOfTheDay: Joi.string().required(),
  fooYung: Joi.when('seaweed', {
    is: 'crispy',
    then: Joi.string().required(),
  }),
};

const mealC = {
  dimSum: 7.5,
  sweetAndSour: 'tasty',
  bananaFritta: 'hot',
};

const mealCSchema = {
  dimSum: Joi.number().integer(),
  sweetAndSour: Joi.string(),
  bananaFritta: Joi.string(),
};

const aAndBSchema = Joi.alternatives().try(mealBSchema, mealASchema);

const mealD = {
  fortuneCookies: 5,
  chowMein: true,
};

const mealE = {
  seaweed: 'crispy',
  fooYung: 'eggy',
  prawnToast: 'sesame',
};

const aConcatBSchema = Joi.object(mealASchema).concat(Joi.object(mealBSchema));

const mealF = {
  prawnToast: 'prawny',
  pulledPork: 'porky',
};

const aConcatBSchemaCAlternative = Joi.alternatives().try(aConcatBSchema, mealCSchema);

const mealG = {
  fortuneCookies: 5,
  prawnToast: 'yum',
  chowMein: true,
};

const mealHSchema = {
  dimSum: Joi.number().max(5),
  sweetAndSour: Joi.string(),
  bananaFritta: Joi.string(),
};

const mealISchema = {
  sweetAndSour: Joi.string(),
  bananaFritta: Joi.string(),
};

const hAndCSchema = Joi.alternatives().try(mealHSchema, mealCSchema, mealISchema);

const mealH = {
  dimSum: 6.5,
  sweetAndSour: 'test',
  bananaFritta: 'filling',
};

describe('when I try and make a decision on what chinese meal to eat', () => {
  it('meal A should be valid', done => {
    Joi.validate(mealA, mealASchema, (err, value) => {
      assert.deepEqual(err, null);
      assert.deepEqual(value, mealA);
      done();
    });
  });

  it('meal B should be valid', done => {
    Joi.validate(mealB, mealBSchema, (err, value) => {
      assert.deepEqual(err, null);
      assert.deepEqual(value, mealB);
      done();
    });
  });

  it('meal A should be valid when trying A and B schemas with B first', done => {
    Joi.validate(mealA, aAndBSchema, (err, value) => {
      assert.deepEqual(err, null);
      assert.deepEqual(value, mealA);
      done();
    });
  });

  it('meal C should not be valid when trying A and B schemas with B first', done => {
    const testFunc = () => {
      Joi.validate(mealC, aAndBSchema, err => {
        assert.deepEqual(err, null);
      });
    };

    assert.throws(testFunc);
    done();
  });

  it('meal D should not be valid when trying A and B schemas with B first', done => {
    const testFunc = () => {
      Joi.validate(mealD, aAndBSchema, err => {
        assert.deepEqual(err, null);
      });
    };

    assert.throws(testFunc);
    done();
  });

  it('meal E should not be valid when trying A and B schemas with B first', done => {
    const testFunc = () => {
      Joi.validate(mealE, aAndBSchema, err => {
        assert.deepEqual(err, null);
      });
    };

    assert.throws(testFunc);
    done();
  });

  it('meal F should not be valid when trying A and B schemas together', done => {
    const testFunc = () => {
      Joi.validate(mealF, aConcatBSchema, err => {
        assert.deepEqual(err, null);
      });
    };

    assert.throws(testFunc);
    done();
  });

  it('meal G should not be valid when trying A and B schemas together ' +
    'with C as an alternative', done => {
    const testFunc = () => {
      Joi.validate(mealG, aConcatBSchemaCAlternative, err => {
        assert.deepEqual(err, null);
      });
    };

    assert.throws(testFunc);
    done();
  });

  it('meal H should not be valid when trying H and C schemas', done => {
    const testFunc = () => {
      Joi.validate(mealH, hAndCSchema, err => {
        assert.deepEqual(err, null);
      });
    };

    assert.throws(testFunc);
    done();
  });
});
