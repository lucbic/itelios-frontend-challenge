require('../node_modules/swiper/dist/css/swiper.min.css')
import Styles from './styles/global.scss'
import Swiper from 'swiper'
import request from './js/request'

// globals
var mySwiper = new Swiper ('.swiper-container', {
  pagination: { el: '.swiper-pagination' },
  slidesPerView: 3,
  breakpoints: {
    [Styles.breakpointLg]: {
      slidesPerView: 1
    }
  }
})

// onload
window.onload = () => {
  request('/static/json/products.json').then(response => {
    const data = response[0].data
    populate(data)
    console.log(data)
  }).catch(error => {
    console.log(error)
  })
}

// functions
function showLess (n, text) {
  if (text.lenght <= n) { return text }
  const sub = text.substr(0, n-1)
  return sub.substr(0, sub.lastIndexOf(' ')) + '...'
}

function imgPath (path) {
  const url = '//www.itelios.com.br/arquivos/imagens/'
  return path.replace(url, '/static/images/')
}

function conditions (str) {
  return str.replace('ou até ','').replace(' sem juros','')
}

function populate (data) {
  const itemImg = document.querySelector('.item__img')
  const itemDescription = document.querySelector('.item__description')
  const itemPrice = document.querySelector('.item__price-tag')
  const itemConditions = document.querySelector('.item__conditions-tag')

  itemImg.src = imgPath(data.item.imageName)
  itemDescription.textContent = showLess(90, data.item.name)
  itemPrice.textContent = data.item.price
  itemConditions.textContent = conditions(data.item.productInfo.paymentConditions)
}
