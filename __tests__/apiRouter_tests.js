const { beforeEach, afterEach } = require('node:test');
const { afterAll } = require('@jest/globals');
const request = require('supertest');
const server = require('../server/server');
const db = require('../server/models/dbPool');
require('dotenv').config();

describe('Our apiRoutes Unit Tests', () => {
  const testKey = process.env.TEST_TOKEN;
  //These are our test users to run through the tests
  //Passing User
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
  //User Name is too long user- 272 chars
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
  //Password is too short User
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
  //Password is too long User
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
  //Email is wrong format User
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
  //Full Name is too long User
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

  // want to make sure the user being passed into the test does not
  //already exist in our database, so we will invoke this function before and after each test
  const deleteUser = async () => {
    const text = `DELETE FROM "public"."users" WHERE ${testKey} = true`;
    console.log('how many times do you see me');
    await db.query(text);
  };
  // Might need to handle some Open Handle issues, not sure if this is the direction to go
  // beforeAll(async () => {
  //   await db.connect();
  // });
  // const closeDB = async () => {
  //   await db.end();
  // };

  //Setting up our tests
  //The outter most scope is testing our Post request at the Path api/newUser
  //The syntax of Jest will explain what each test is doing
  describe('POST /newUser', () => {
    describe('Testing Validator Middleware', () => {
      beforeEach(deleteUser());
      afterEach(deleteUser());
      test('Should Post newUser successfully', (done) => {
        request(server)
          .post('/api/newUser')
          .send(newUser)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
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

  //Here are some more tests that would be good to implement, the below is just a starting point, and need to be refined
  //for actual testing of our code
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
