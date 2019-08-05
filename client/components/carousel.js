import React from 'react'
import {Carousel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'

class CarouselHeader extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
  }

  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="https://68c8648dbe66747498d1-6027f91c84d2b73bebfc9b6bc4f4a0ac.ssl.cf3.rackcdn.com/5a940837223e9502fcbf2b8e/Cook-Island-banner.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="carousel-header">
              Welcome to Island World! Paradise at Your Fingertips
            </h3>
            <p className="carousel-body-txt">Find your private island today</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="https://ameliaadventures.com/wp-content/uploads/2017/06/Amelia-Island-Sunset-Cruise-banner-16x9-9554-1.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="carousel-header">
              Welcome to Island World! Paradise at Your Fingertips
            </h3>
            <p className="carousel-body-txt">For the discerning buyer</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="https://newhhdesktop-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/Sofitel-Bora-Bora-Private-Island-03.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="carousel-header">
              Welcome to Island World! Paradise at Your Fingertips
            </h3>
            <p className="carousel-body-txt">
              Visit our sister website Yachtworld for all your boating needs!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}

// const CarouselHeader = props => {
//   console.log(props)

// }

const mapStateToProps = state => ({
  products: state.product.productList
})

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(CarouselHeader)
