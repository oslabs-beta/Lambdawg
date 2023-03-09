// // const db = require('../server/routesTests/apiTest');
// const db = require('../server/models/dbPool');

// //We will be testing the database functions here
// // ie: insert, select, delete

// describe('database unit tests', () => {
//   //should write in some functionality to clear whatever is being tested befpre and
//   //after to ensure that we are testing what needs to be tested
//   //For now we don't really need to worry about it

//   //I want to write a test that will test the get request
//   //I need to write a post request that I can input something into our database to test against
//   describe('#getUsers', () => {
//     // afterAll(() => {
//     //   db.end();
//     // });

//     it('returns our array of objects from the database', async () => {
//       const text = `SELECT * FROM "public"."users" WHERE "full_name" = 'cookieMonster2'`;
//       const result = await db.query(text);
//       console.log('Result ', result);
//       const users = [
//         {
//           _id: 67,
//           arn: null,
//           email: 'cm2@cm2.com',
//           full_name: 'cookieMonster2',
//           password_:
//             '$2b$10$bxjdez4j.gbvz1KQs1EPWugqSqUQZNtSjevM2qwxJ2PXdT0uGROBm',
//           region: null,
//           user_name: 'cookieMonster2',
//         },
//       ];
//       expect(result.rows).toEqual(users);
//       // expect(response.status).toBe(200);
//       // expect(response.data).toEqual(users);
//     });
//   });
//   ////////////
//   // describe('#getUsers', () => {
//   //   test('should return an array of Objects from database', async () => {
//   //     const response = await axios.get(
//   //       'postgres://fzlocmxc:cSVvrq52FYy9AXvuGc2r6lwqoFnzEH82@trumpet.db.elephantsql.com/fzlocmxc'
//   //     );
//   //     expect(response.status).toBe(200);
//   //     expect(response.data).toEqual(users);
//   //   });
//   // });
// });
//////////////////////////////////
// const db = require('../server/models/dbPool');

// describe('database unit tests', () => {
//   describe('#getUsers', () => {
//     it('returns an array of objects from the database', async () => {
//       const text = `SELECT * FROM "public"."users" WHERE "full_name" = 'cookieMonster2'`;
//       const result = await db.query(text);
//       const expectedUsers = [
//         {
//           _id: 67,
//           arn: null,
//           email: 'cm2@cm2.com',
//           full_name: 'cookieMonster2',
//           password_:
//             '$2b$10$bxjdez4j.gbvz1KQs1EPWugqSqUQZNtSjevM2qwxJ2PXdT0uGROBm',
//           region: null,
//           user_name: 'cookieMonster2',
//         },
//       ];
//       expect(result.rows).toEqual(expectedUsers);
//     });
//   });

//   describe('#addUser', () => {
//     it('adds a new user to the database', async () => {
//       const newUser = {
//         full_name: 'testUser',
//         email: 'testUser@example.com',
//         user_name: 'testUser',
//         password_: 'testPassword',
//       };
//       const text = `INSERT INTO "public"."users" ("full_name", "email", "user_name", "password_")
//                     VALUES ($1, $2, $3, $4)`;
//       const values = [newUser.full_name, newUser.email, newUser.user_name, newUser.password_];
//       await db.query(text, values);

//       const queryText = `SELECT * FROM "public"."users" WHERE "full_name" = 'testUser'`;
//       const queryResult = await db.query(queryText);

//       expect(queryResult.rows.length).toBe(1);
//       expect(queryResult.rows[0]).toMatchObject(newUser);
//     });
//   });
// });

///////////////////////////
// describe('database unit tests', () => {
//   let testUser;

//   beforeAll(async () => {
//     // Create a test user
//     const text = `
//       INSERT INTO "public"."users" (
//         "arn",
//         "email",
//         "full_name",
//         "password_",
//         "region",
//         "user_name"
//       ) VALUES (
//         null,
//         'testuser@test.com',
//         'Test User',
//         'password',
//         null,
//         'testuser'
//       ) RETURNING *
//     `;
//     const result = await db.query(text);
//     testUser = result.rows[0];
//   });

//   afterAll(async () => {
//     // Delete the test user
//     const text = `DELETE FROM "public"."users" WHERE "user_name" = $1`;
//     await db.query(text, [testUser.user_name]);
//   });

//   describe('#deleteUser', () => {
//     it('deletes a user from the database', async () => {
//       // Delete the test user
//       const response = await request(app)
//         .delete(`/delete/${testUser.user_name}`)
//         .set('Authorization', `Bearer ${token}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({});

//       // Check that the user was deleted
//       const selectText = `SELECT * FROM "public"."users" WHERE "user_name" = $1`;
//       const selectResult = await db.query(selectText, [testUser.user_name]);
//       expect(selectResult.rows.length).toBe(0);
//     });
//   });
// });

/////////////////////////Combo of above 2 snippets, need to work on still
const db = require('../server/models/dbPool');
const request = require('supertest');
const app = require('../server/server');

describe('database unit tests', () => {
  let testUser;

  beforeAll(async () => {
    // Create a test user
    const text = `
      INSERT INTO "public"."users" (
        "arn",
        "email",
        "full_name",
        "password_",
        "region",
        "user_name"
      ) VALUES (
        null,
        'testuser@test.com',
        'Test User',
        'password',
        null,
        'testuser'
      ) RETURNING *
    `;
    const result = await db.query(text);
    testUser = result.rows[0];
  });

  afterAll(async () => {
    // Delete the test user
    const text = `DELETE FROM "public"."users" WHERE "user_name" = $1`;
    await db.query(text, [testUser.user_name]);
  });

  describe('#getUsers', () => {
    it('returns an array of objects from the database', async () => {
      const text = `SELECT * FROM "public"."users" WHERE "full_name" = 'cookieMonster2'`;
      const result = await db.query(text);
      const expectedUsers = [
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
      expect(result.rows).toEqual(expectedUsers);
    });
  });

  describe('#addUser', () => {
    it('adds a new user to the database', async () => {
      const newUser = {
        full_name: 'testUser',
        email: 'testUser@example.com',
        user_name: 'testUser',
        password_: 'testPassword',
      };
      const text = `INSERT INTO "public"."users" ("full_name", "email", "user_name", "password_")
                    VALUES ($1, $2, $3, $4)`;
      const values = [
        newUser.full_name,
        newUser.email,
        newUser.user_name,
        newUser.password_,
      ];
      await db.query(text, values);

      const queryText = `SELECT * FROM "public"."users" WHERE "full_name" = 'testUser'`;
      const queryResult = await db.query(queryText);

      expect(queryResult.rows.length).toBe(1);
      expect(queryResult.rows[0]).toMatchObject(newUser);
    });
  });

  describe('#deleteUser', () => {
    it('deletes a user from the database', async () => {
      // Delete the test user
      const response = await request(app)
        .delete(`/delete/${testUser.user_name}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});

      // Check that the user was deleted
      const selectText = `SELECT * FROM "public"."users" WHERE "user_name" = $1`;
      const selectResult = await db.query(selectText, [testUser.user_name]);
      expect(selectResult.rows.length).toBe(0);
    });
  });
});
