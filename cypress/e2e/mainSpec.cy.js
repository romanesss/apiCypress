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

  it('Create user with all fields', () => {
    const apiKey = '640ceaf68678b6e67b16b17f';
    const firstName = utils.randomStr(8);
    const lastName = utils.randomStr(8);
    const userMail = utils.makeEmail();
    const title = 'mr';
    const gender = 'male';
    const dateOfBirth = '1/1/2001 ';
    const phone = '05543242341';
    const imgUrl = 'https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png';
    const location = {
      'street': 'Komarova',
      'city': 'Kyiv',
      'state': 'My state',
      'country': 'Ukraine',
      'timezone': '+1:00'
    };
    
    cy.request({
      method: 'POST',
      url: 'https://dummyapi.io/data/v1/user/create',
      headers: {
        'app-id': apiKey,
      },
      body: {
        'firstName': firstName,
        'lastName': lastName,
        'email': userMail,
        'title': title,
        'gender': gender,
        'dateOfBirth': dateOfBirth,
        'phone': phone,
        'imgUrl': imgUrl,
        'location': location
      }
    }).then((resp)=>{
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('email', userMail);
      expect(resp.body).to.have.property('firstName', firstName);
      expect(resp.body).to.have.property('lastName', lastName);
      expect(resp.body).to.have.property('title', title);
      expect(resp.body).to.have.property('gender', gender);
      expect(resp.body).to.have.property('phone', phone);
    })
  });

  it('Delete user email', () => {
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

  it('Update user first name and las name', () => {
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

  it('Create post', () => {
    const apiKey = '640ceaf68678b6e67b16b17f';
    const userMail = utils.makeEmail();
    const firstName = utils.randomStr(8);
    const lastName = utils.randomStr(8);

    const postTest = utils.randomStr(12);
    const imgUrl = 'https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png';
    const tags = ['one', 'two', 'three'];
    const likeCounter = 10;

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
        method: 'POST',
        url: 'https://dummyapi.io/data/v1/post/create',
        headers: {
        'app-id': apiKey,
      },
      body: {
        "text": postTest,
        "image": imgUrl,
        "likes": likeCounter,
        "tags": tags,
        "owner": userId
        }
      }).then((reps) => {
        expect(reps.status).to.eq(200);
      });
    });
  });
});