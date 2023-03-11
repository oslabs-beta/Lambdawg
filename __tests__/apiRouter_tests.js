//UNDER CONSTRUCTION
const request = require('supertest');
const app = require('../server/routes/api');
describe('Our apiRoutes Unit Tests', () => {
  describe('POST /newUser', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/newUser').send({
        username: 'testuser',
        password: 'testpassword',
        full_name: 'Test User',
        email: 'testuser@example.com',
      });

      expect(response.status).toBe(200);
    });
  });

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
  });
});
