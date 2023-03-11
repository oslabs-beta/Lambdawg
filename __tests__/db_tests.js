const db = require('../server/models/dbPool');
// const request = require('supertest');
// const app = require('../server/server');

//I added the skips during the test building process don't forget to remove
describe.skip('database unit tests', () => {
  const newUser = {
    full_name: 'Test User',
    email: 'testUser@example.com',
    user_name: 'testUser',
    password_: 'password',
    arn: null,
    region: null,
  };
  // I 'x'ed out the its in these 3 tests during testing other areas
  describe.skip('#addUser', () => {
    xit('adds a new user to the database', async () => {
      /*const newUser = {
        full_name: 'Test User',
        email: 'testUser@example.com',
        user_name: 'testUser',
        password_: 'password',
      };*/
      const values = [
        newUser.full_name,
        newUser.email,
        newUser.user_name,
        newUser.password_,
        newUser.arn,
        newUser.region,
      ];
      const text = `INSERT INTO "public"."users" ("full_name", "email", "user_name", "password_", "arn", "region")
                  VALUES ($1, $2, $3, $4, $5, $6)`;

      await db.query(text, values);

      const queryText = `SELECT * FROM "public"."users" WHERE "full_name" = '${newUser.full_name}'`;
      const queryResult = await db.query(queryText);

      const { _id } = queryResult.rows[0];
      // console.log('query Result ', queryResult.rows[0]);
      newUser._id = _id;
      // console.log('newUser ', newUser);
      expect(queryResult.rows.length).toBe(1);
      expect(queryResult.rows[0]).toMatchObject(newUser);
    });
  });
  //*/
  describe.skip('#getUser', () => {
    xit('returns an object of our test users info from the database', async () => {
      const text = `SELECT * FROM "public"."users" WHERE "full_name" = '${newUser.full_name}'`;
      const result = await db.query(text);
      // console.log('result.rows ', result.rows);
      expect(result.rows[0]).toEqual(newUser);
    });
  });

  describe.skip('#deleteUser', () => {
    xit('deletes a user from the database', async () => {
      // Delete the test user
      // const response = await request(app).delete(`/delete/testUser`);
      const text = `DELETE FROM "public"."users" WHERE "full_name" = '${newUser.full_name}'`;
      const result = await db.query(text);

      console.log('result ', result);

      expect(result.rows.length).toBe(0);
      // Check that the user was deleted
      const selectText = `SELECT * FROM "public"."users" WHERE "full_name" = 'Test User'`;
      const selectResult = await db.query(selectText);
      expect(selectResult.rows.length).toBe(0);
    });
  });
});
