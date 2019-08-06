import React from 'react'
import {Image} from 'react-bootstrap'

const NotFound = () => {
  return (
    <div>
      <h2 id="not-found">
        Sorry, the island you are looking for is in the Bermuda Triangle
      </h2>
      <Image
        src="https://accidentalfactory.com/wp-content/uploads/2018/01/19E1pSaEhxBa9fVH9B3nftQ.jpeg"
        id="not-found-img"
        roundedCircle
      />
    </div>
  )
}

export default NotFound
