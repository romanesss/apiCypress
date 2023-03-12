import { utils } from '../support/utils';

describe('Api spec', () => {
  it('Create user with required fields', () => {
    const apiKey = '640ceaf68678b6e67b16b17f';
    const userMail = utils.makeEmail();
    const firstName = utils.randomStr(8);
    const lastName = utils.randomStr(8);
    cy.request({
      method: 'POST',
      url: 'https://dummyapi.io/data/v1/user/create',
      headers: {
        'app-id': apiKey,
      },
      body: {
        "firstName": firstName,
        "lastName": lastName,
        "email": userMail
      }
    }).then((resp)=>{
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('email', userMail);
    })
  });

  it('delete user email', () => {
    const apiKey = '640ceaf68678b6e67b16b17f';
    const userMail = utils.makeEmail();
    const firstName = utils.randomStr(8);
    const lastName = utils.randomStr(8);
    cy.request({
      method: 'POST',
      url: 'https://dummyapi.io/data/v1/user/create',
      headers: {
        'app-id': apiKey,
      },
      body: {
        "firstName": firstName,
        "lastName": lastName,
        "email": userMail
      }
    }).then((resp)=>{
      const userId = resp.body.id;
      cy.request({
        method: 'DELETE',
        url: 'https://dummyapi.io/data/v1/user/' + userId,
        headers: {
          'app-id': apiKey,
        }
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });

  it('Update user name and las name', () => {
    const apiKey = '640ceaf68678b6e67b16b17f';
    const userMail = utils.makeEmail();
    const firstName = utils.randomStr(8);
    const lastName = utils.randomStr(8);
    const firstNameNew = utils.randomStr(8);
    const lastNameNew = utils.randomStr(8);
   

    cy.request({
      method: 'POST',
      url: 'https://dummyapi.io/data/v1/user/create',
      headers: {
        'app-id': apiKey,
      },
      body: {
        "firstName": firstName,
        "lastName": lastName,
        "email": userMail
      }
    }).then((reps)=>{
      const userId = reps.body.id;
      cy.request({
        method: 'PUT',
        url: 'https://dummyapi.io/data/v1/user/' + userId,
        headers: {
          'app-id': apiKey,
        },
        body: {
          "firstName": firstNameNew,
          "lastName": lastNameNew
        }
      }).then((reps) => {
        expect(reps.status).to.eq(200);
        expect(reps.body).to.have.property('firstName', firstNameNew);
        expect(reps.body).to.have.property('lastName', lastNameNew);
      });
    });
  });
});