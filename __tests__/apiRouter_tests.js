//UNDER CONSTRUCTION
const { beforeEach, before, afterEach } = require('node:test');
const { afterAll } = require('@jest/globals');
const request = require('supertest');
const server = require('../server/server');
const db = require('../server/models/dbPool');
require('dotenv').config();

describe('Our apiRoutes Unit Tests', () => {
  const testKey = process.env.TEST_TOKEN;
  //password password
  const newUser = [
    {
      user_name: 'testUser',
      password_: 'password',
      full_name: 'Test User',
      email: 'testuser@example.com',
      arn: null,
      region: null,
      [testKey]: true,
    },
  ];
  //password password
  const newUser272CharsUN_1 = [
    {
      user_name:
        'testUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUser',
      password_: 'password',
      full_name: 'Test User_1',
      email: 'testuser_1@example.com',
      arn: null,
      region: null,
      [testKey]: true,
    },
  ];
  //password passwor
  const newUserShortPass_2 = [
    {
      user_name: 'testUser_2',
      password_: 'passwor',
      full_name: 'Test User_2',
      email: 'testuser_2@example.com',
      arn: null,
      region: null,
      [testKey]: true,
    },
  ];
  //password 'testUser' x34
  const newUser272CharsPW_3 = [
    {
      user_name: 'testUser_3',
      password_:
        'testUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUser',
      full_name: 'Test User_3',
      email: 'testuser_3@example.com',
      arn: null,
      region: null,
      [testKey]: true,
    },
  ];
  //password password
  const newUserBadEmail_4 = [
    {
      user_name: 'testUser_4',
      password_: 'password',
      full_name: 'Test User_4',
      email: 'testuserexample.com',
      arn: null,
      region: null,
      [testKey]: true,
    },
  ];
  //password password
  const newUser272CharsFN_5 = [
    {
      user_name: 'testUser_5',
      password_: 'password',
      full_name:
        'testUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUser',
      email: 'testuser_5@example.com',
      arn: null,
      region: null,
      [testKey]: true,
    },
  ];
  // let _id;
  // want to make sure the user being passed into the test does not
  //already exist in our database
  //Will want to implement some logic before to check if they exist, and if so delete them
  const deleteUser = async () => {
    const text = `DELETE FROM "public"."users" WHERE ${testKey} = true`;
    console.log('how many times do you see me');
    await db.query(text);
  };
  // const closeDB = async () => {
  //   await db.end();
  // };

  // beforeAll(async () => {
  //   await db.connect();
  // });

  //This isnt working the way I think it should
  //closes the DB connection after all of the tests have run
  // afterAll(async () => {
  //   await db.end();
  // });
  describe('POST /newUser', () => {
    describe('Testing Validator Middleware', () => {
      beforeEach(deleteUser());
      afterEach(deleteUser());
      test('Should Post newUser successfully', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUser)
          // .expect('Content-Type', /json/)
          // .expect('{}')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });
      test('Should Not Post User because User Name is too Long', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUser272CharsUN_1)
          .expect('User Name must be between 1-255 Characters')
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });

      test('Should Not Post User because Password is too Short', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUserShortPass_2)
          .expect('Password must be at least 8 characters long')
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });
      test('Should Not Post User because Password is too Long', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUser272CharsPW_3)
          .expect('Password must be at least 8 characters long')
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });
      test('Should Not Post User because Password is too Long', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUserBadEmail_4)
          .expect('Invalid Email Address')
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });
      test('Should Not Post User because Password is too Long', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUser272CharsFN_5)
          .expect('Full Name must be between 1-255 Characters')
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });
    });
    //This needs to be Changed around, it's just some copy pasta from a previous test
    /*
    describe('Testing HashPW Middleware', () => {
      beforeEach(deleteUser());
      afterEach(deleteUser());
      test('Should Hash Password successfully', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUser)
          .expect('Content-Type', /json/)
          .expect('{}')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // _id = res.body.data[0]._id;
            return done();
          });
      });
    });
    */
  });

  /*
  describe('POST /newUser', () => {
    it('should create a new user without issue', async () => {
      const response = await request(server).post('/newUser').send(newUser); //does this need to be json?
      console.log('response ', response);
      expect(response.status).toBe(200);
    });
  });
  */
  /*
  describe('POST /:user_name', () => {
    it('should set a session cookie', async () => {
      const response = await request(server)
        .post('/testuser')
        .auth('testuser', 'testpassword'); // set basic authentication

      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });

  describe('GET /', () => {
    it('should return a user whose cookie matches', async () => {
      const response = await request(server)
        .get('/')
        .set('Cookie', 'sessionid=abc123'); // set a session cookie

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('PATCH /edit', () => {
    it('should update a user', async () => {
      const response = await request(server)
        .patch('/edit')
        .auth('testuser', 'testpassword') // set basic authentication
        .send({
          full_name: 'New Name',
          email: 'newemail@example.com',
        });

      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /delete/:user_name', () => {
    it('should delete a user', async () => {
      const response = await request(server)
        .delete('/delete/testuser')
        .auth('testuser', 'testpassword'); // set basic authentication

      expect(response.status).toBe(200);
    });
  });

  describe('GET /logout', () => {
    it('should delete the session cookie', async () => {
      const response = await request(server)
        .get('/logout')
        .set('Cookie', 'sessionid=abc123'); // set a session cookie

      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });*/
});
