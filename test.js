const chai = require('chai')
chai.should()

const {urlToData, dataToUrl} = require('./index')

describe('simple route', () => {
  const config = ['/', ['users/',   'usersList',
                       'articles/', 'articlesList']]

  it('should math users route', () => {
    urlToData(config, '/users/').should.be.eql({handler: 'usersList'})
  })
  it('should match articles route', () => {
    urlToData(config, '/articles/').should.be.eql({handler: 'articlesList'})
  })



  it('should create users url', () => {
    dataToUrl(config, {handler: 'usersList'}).should.be.eql('/users/')
  })
  it('should create articles url', () => {
    dataToUrl(config, {handler: 'articlesList'}).should.be.eql('/articles/')
  })
})

describe('not found route', () => {
  const config = ['/',  ['users/',   'usersList',
                        'articles/', 'articlesList'],
                  true, 'notFound']

  it('should math users route', () => {
    urlToData(config, '/users/').should.be.eql({handler: 'usersList'})
  })
  it('should match notFound route', () => {
    urlToData(config, '/fake/').should.be.eql({handler: 'notFound'})
  })
})


describe('params', () => {
  const config = ['/', ['users/', ['',     'usersList',
                                   ':id/', 'userPage']]]

  it('should math users list route', () => {
    urlToData(config, '/users/').should.be.eql({handler: 'usersList'})
  })
  it('should match user route with param', () => {
    urlToData(config, '/users/123').should.be.eql({handler: 'userPage', id: '123'})
  })


  it('should create users url', () => {
    dataToUrl(config, {handler: 'usersList'}).should.be.eql('/users/')
  })
  it('should create user page url', () => {
    dataToUrl(config, {handler: 'userPage', id: '1000'}).should.be.eql('/users/1000')
  })
})

describe('regex pattern', () => {
  const config = ['/',  [['users/', [/\d+/g, ':id']],   'userPage'],
                  true, 'notFound']

  it('should math user page', () => {
    urlToData(config, '/users/123').should.be.eql({handler: 'userPage', id: '123'})
  })
  it('should match notFound route', () => {
    urlToData(config, '/users/not-a-number').should.be.eql({handler: 'notFound'})
  })

  it('should create user page url', () => {
    dataToUrl(config, {handler: 'userPage', id: '1000'}).should.be.eql('/users/1000')
  })
})

