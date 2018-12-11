import * as Sample from './sample'

describe('sample get request', () => {
  it('should be handled', () => {
    const result = Sample.sampleGetAction({ some: 'thing' })
    expect(result).toBe('get request complete')
  })
})

describe('sample post request', () => {
  it('should be handled', () => {
    const result = Sample.sampleGetAction({ some: 'thing' })
    expect(result).toBe('get request complete')  
  })
})
