import {expect} from 'chai'
import {numberWithCommas} from './utils'

describe('number with commas function', () => {
  it('separates a number with commas', () => {
    expect(numberWithCommas(100000)).to.be.equal('100,000')
  })
})
