const common = require('../index');
const HttpStatusCode = require('../../app/helpers/httpStatusCode');

/**
 * @author Matheus Mol
 */

// describe('POST Auth', () => {

//     it('Auth with status OK', async ()=> {
//         //test
//         const payload = {
//             "LOGIN": "login",
//             "PASSWORD": "password"
//         };
//         const res = await common.chai.request(common.server)
//             .post(`/api/v1/auth/access-token`)
//             .send(payload);

//         const status = HttpStatusCode.OK;
//         res.should.have.status(status);
//     });

//     it('BAD_REQUEST', async ()=> {
//         //test
//         const payload = {
//             "LOGIN": "666",
//             "PASSWORD": "666666"
//         };
//         const res = await common.chai.request(common.server)
//             .post(`/api/v1/auth/access-token`)
//             .send(payload);

//         const status = HttpStatusCode.BAD_REQUEST;
//         res.should.have.status(status);
//     });

// });
