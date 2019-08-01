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
            src="https://www.privateislandsonline.com/uploads/resize/_1941_5882c62c7a853.jpg-1360-1100.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="carousel-header">
              Welcome to Island World! Paradise at Your Fingertips
            </h3>
            <p>Find your private island today</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="https://www.privateislandsonline.com/uploads/resize/_2166_58a717b099569.jpg-1074-822.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="carousel-header">
              Welcome to Island World! Paradise at Your Fingertips
            </h3>
            <p>For the discerning buyer</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-img"
            src="https://www.privateislandsonline.com/uploads/resize/_909_image_eae61786dd.jpg-1074-822.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="carousel-header">
              Welcome to Island World! Paradise at Your Fingertips
            </h3>
            <p>
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
