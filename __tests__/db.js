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
      const text = `SELECT * FROM "public"."users" WHERE "full_name" = 'cookieMonster2'`;
      const result = await db.query(text);
      console.log('Result ', result);
      const users = [
        {
          _id: 67,
          arn: null,
          email: 'cm2@cm2.com',
          full_name: 'cookieMonster2',
          password_:
            '$2b$10$bxjdez4j.gbvz1KQs1EPWugqSqUQZNtSjevM2qwxJ2PXdT0uGROBm',
          region: null,
          user_name: 'cookieMonster2',
        },
      ];
      expect(result.rows).toEqual(users);
      // expect(response.status).toBe(200);
      // expect(response.data).toEqual(users);
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
