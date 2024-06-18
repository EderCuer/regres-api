import { faker } from '@faker-js/faker'

describe('CREATE', () => {

  context('/POST', () => {

    it('user created successfully', () => {
      const userName = faker.person.firstName()
      const userJob = faker.person.jobType()

      cy.fixture('post_user').then((userSchema) => {
        cy.api({
          method: 'POST',
          url: '/users',
          body: {
            name: userName,
            job: userJob
          }
        }).then((xhr) => {
          expect(xhr.status).to.eq(201)
          expect(xhr.body.name).to.eq(userName)
          expect(xhr.body.job).to.eq(userJob)
          expect(xhr.body).to.be.jsonSchema(userSchema)
        })
      })
    })
  })

  context('/GET', () => {

    it('list users', () => {
      cy.fixture('get_users').then((userSchema) => {
        cy.api({
          method: 'GET',
          url: '/users'
        }).then((xhr) => {
          expect(xhr.status).to.eq(200)
          expect(xhr.body).to.be.jsonSchema(userSchema)
        })
      })
    })

    it('list user {id}', () => {
      const id = faker.number.int({ min: 1, max: 12 })
      cy.fixture('get_user_id').then((userSchema) => {
        cy.log(userSchema)
        cy.api({
          method: 'GET',
          url: `/users/${id}`
        }).then((xhr) => {
          expect(xhr.status).to.eq(200)
          expect(xhr.body.data.id).to.eq(id)
          expect(xhr.body).to.be.jsonSchema(userSchema)
        })
      })
    })

  })

  context('/PUT', () => {

    it('update user successfully', () => {
      const id = faker.number.int({ min: 1, max: 12 })
      const newJob = faker.person.jobType()

      cy.fixture('put_user').then((userSchema) => {
        cy.api({
          method: 'PUT',
          url: `/users/${id}`,
          body: {
            job: newJob
          }
        }).then((xhr) => {
          expect(xhr.status).to.eq(200)
          expect(xhr.body.job).to.eq(newJob)
          expect(xhr.body).to.be.jsonSchema(userSchema)
        })
      })
    })
  })

  context('/DELETE', () => {

    it('successfully delete user', () => {
      const id = faker.number.int({ min: 1, max: 12 })

      cy.api({
        method: 'DELETE',
        url: `/users/${id}`,
      }).then((xhr) => {
        expect(xhr.status).to.eq(204)
      })
    })
  })
})