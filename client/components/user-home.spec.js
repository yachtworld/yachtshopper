/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserHome from './user-home'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let renderUserHome

  beforeEach(() => {
    renderUserHome = render(<UserHome store={store} />)
  })

  it('generates a user home div', () => {
    expect(renderUserHome.find('#user-home')._root.length).to.equal(1)
  })
})
