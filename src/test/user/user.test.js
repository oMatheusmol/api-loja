const common = require('../index');
const HttpStatusCode = require('../../app/helpers/httpStatusCode');
const faker = require('faker');
faker.locale = 'pt_BR';
/**
 * @author Matheus Mol
 */

// describe('POST Product', () => {
//   const value = {
//     "productName": faker.commerce.productName(),
//     "price": faker.datatype.float() ,
//     "amount": faker.datatype.number()
//   }
//   console.log(value)

//   const payload = {
//     "LOGIN": "login",
//     "PASSWORD": "password"
//   };

//   it('WITHOUT TOKEN POST', async ()=> {
//       //test
//       const res = await common.chai.request(common.server)
//           .post(`/api/v1/product`)
//           .send(value);

//       const status =HttpStatusCode.UNAUTHORIZED;
//       res.should.have.status(status);
//   });

//   it('WITH TOKEN POST', async ()=> {

//   let token = await common.chai.request(common.server)
//           .post(`/api/v1/auth/access-token`)
//           .send(payload);
//   token = `Bearer ${token.body.token}`;

//   //test

//   const res = await common.chai.request(common.server)
//       .post(`/api/v1/product`)
//       .set({'Authorization': token})
//       .send(value);

//   const status =HttpStatusCode.CREATED;
//   res.should.have.status(status);
//   });

// });

// describe('DELETE Product', () => {
//   const value = {
//     "id": 6
//   }
//   const payload = {
//     "LOGIN": "login",
//     "PASSWORD": "password"
//   };

//   it('WITHOUT TOKEN DELETE', async ()=> {
//       //test

//       const res = await common.chai.request(common.server)
//           .get(`/api/v1/product`)

//       const status = HttpStatusCode. METHOD_NOT_ALLOWED;
//       res.should.have.status(status);
//   });

//   it('WITH TOKEN DELETE', async ()=> {

//     let token = await common.chai.request(common.server)
//           .post(`/api/v1/auth/access-token`)
//           .send(payload);
//     token = `Bearer ${token.body.token}`;

//     //test

//     const res = await common.chai.request(common.server)
//         .del(`/api/v1/product`)
//         .set({'Authorization': token})
//         .send(value)

//     const status = HttpStatusCode.CREATED;
//     res.should.have.status(status);
//   });

// });

// describe('GET Product', () => {
//   const payload = {
//     "LOGIN": "login",
//     "PASSWORD": "password"
//   };
//   const value = faker.commerce.productName();

//   it('WITHOUT TOKEN GET', async ()=> {
//       //test
//       const res = await common.chai.request(common.server)
//           .get(`/api/v1/product/${value}`)

//       const status = HttpStatusCode. UNAUTHORIZED;
//       res.should.have.status(status);
//   });

//   it('WITH TOKEN GET', async ()=> {

//     let token = await common.chai.request(common.server)
//           .post(`/api/v1/auth/access-token`)
//           .send(payload);
//     token = `Bearer ${token.body.token}`;

//     //test

//     const res = await common.chai.request(common.server)
//         .get(`/api/v1/product/${value}}`)
//         .set({'Authorization': token})

//     const status = HttpStatusCode.CREATED;
//     res.should.have.status(status);
//   });
// });

// describe('PUT Product', () => {
//     const value = {
//       "productName": "peixe",
//       "id": 12,
//     }
//     const payload = {
//       "LOGIN": "login",
//       "PASSWORD": "password"
//     };

//     it('WITHOUT TOKEN PUT', async ()=> {
//         //test

//         const res = await common.chai.request(common.server)
//             .get(`/api/v1/product`)

//         const status = HttpStatusCode. METHOD_NOT_ALLOWED;
//         res.should.have.status(status);
//     });

//     it('WITH TOKEN PUT', async ()=> {

//       let token = await common.chai.request(common.server)
//             .post(`/api/v1/auth/access-token`)
//             .send(payload);
//       token = `Bearer ${token.body.token}`;

//       //test

//       const res = await common.chai.request(common.server)
//           .put(`/api/v1/product`)
//           .set({'Authorization': token})
//           .send(value)

//       const status = HttpStatusCode.CREATED;
//       res.should.have.status(status);
//     });

// });
