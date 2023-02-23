// const db = require('../server/routesTests/apiTest');
const db = require('../server/models/dbPool');

//We will be testing the database functions here
// ie: insert, select, delete

describe('database unit tests', () => {
  //should write in some functionality to clear whatever is being tested befpre and
  //after to ensure that we are testing what needs to be tested
  //For now we don't really need to worry about it

  //I want to write a test that will test the get request
  //I need to write a post request that I can input something into our database to test against
  describe('#getUsers', () => {
    // afterAll(() => {
    //   db.end();
    // });

    it('returns our array of objects from the database', async () => {
      const text = 'SELECT * FROM "public"."users" LIMIT 10';
      const result = await db.query(text);

      const users = [
        {
          _id: 1,
          full_name: 'John Doe',
          user_name: 'JohnnyD',
          email: 'johnnyd@johnnyd.com',
          password_: 'jdpassword',
        },
      ];
      expect(result.rows).toEqual(users);
    });
  });
  ////////////
  // describe('#getUsers', () => {
  //   test('should return an array of Objects from database', async () => {
  //     const response = await axios.get(
  //       'postgres://fzlocmxc:cSVvrq52FYy9AXvuGc2r6lwqoFnzEH82@trumpet.db.elephantsql.com/fzlocmxc'
  //     );
  //     expect(response.status).toBe(200);
  //     expect(response.data).toEqual(users);
  //   });
  // });
});
