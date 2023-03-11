//UNDER CONSTRUCTION
const request = require('supertest');
const app = require('../server/routes/api');

describe('Our apiRoutes Unit Tests', () => {
  //password password
  const newUser = [
    {
      username: 'testUser',
      password: 'password',
      full_name: 'Test User',
      email: 'testuser@example.com',
      arn: null,
      region: null,
    },
  ];
  //password password
  const newUser272CharsUN_1 = {
    username:
      'testUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUser',
    password: 'password',
    full_name: 'Test User_1',
    email: 'testuser_1@example.com',
    arn: null,
    region: null,
  };
  //password passwor
  const newUserShortPass_2 = {
    username: 'testUser_2',
    password: 'passwor',
    full_name: 'Test User_2',
    email: 'testuser_2@example.com',
    arn: null,
    region: null,
  };
  //password 'testUser' x34
  const newUser272CharsPW_3 = {
    username: 'testUser_3',
    password:
      'testUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUser',
    full_name: 'Test User_3',
    email: 'testuser_3@example.com',
    arn: null,
    region: null,
  };
  //password password
  const newUserBadEmail_4 = {
    username: 'testUser_4',
    password: 'password',
    full_name: 'Test User_4',
    email: 'testuserexample.com',
    arn: null,
    region: null,
  };
  //password password
  const newUser272CharsFN_5 = {
    username: 'testUser_5',
    password: 'password',
    full_name:
      'testUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUsertestUser',
    email: 'testuser_5@example.com',
    arn: null,
    region: null,
  };
  let _id;
  //using different syntax from supertest
  describe('should create a new user without issue', () => {
    test('POST /newUser', (done) => {
      request(app)
        .post('/newUser')
        .expect('Content-Type', /json/)
        .send(newUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          _id = res.body.data[0]._id;
          return done();
        });
    });
  });
  /*
  describe('POST /newUser', () => {
    it('should create a new user without issue', async () => {
      const response = await request(app).post('/newUser').send(newUser); //does this need to be json?
      console.log('response ', response);
      expect(response.status).toBe(200);
    });
  });
  */
  /*
  describe('POST /:user_name', () => {
    it('should set a session cookie', async () => {
      const response = await request(app)
        .post('/testuser')
        .auth('testuser', 'testpassword'); // set basic authentication

      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });

  describe('GET /', () => {
    it('should return a user whose cookie matches', async () => {
      const response = await request(app)
        .get('/')
        .set('Cookie', 'sessionid=abc123'); // set a session cookie

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('PATCH /edit', () => {
    it('should update a user', async () => {
      const response = await request(app)
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
      const response = await request(app)
        .delete('/delete/testuser')
        .auth('testuser', 'testpassword'); // set basic authentication

      expect(response.status).toBe(200);
    });
  });

  describe('GET /logout', () => {
    it('should delete the session cookie', async () => {
      const response = await request(app)
        .get('/logout')
        .set('Cookie', 'sessionid=abc123'); // set a session cookie

      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });*/
});
