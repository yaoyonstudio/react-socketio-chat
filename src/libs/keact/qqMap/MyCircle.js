class MyCircle {
  constructor () {
    this.dom = document.createElement('div')
    this.dom.style.cssText = 
      'background: #ff7900; color: #fff; font-size: 12px; position:absolute;' + 
      'text-align:center; width: 70px; height: 70px; border-radius: 100%;' +
      'display: flex; align-items: center; justify-content: center;'
    this.dom.innerHTML = this.get('inithtml')
    this.getPanes().overlayLayer.appendChild(this.dom)
  }
  html (html) {
    this.dom.innerHTML = html
  }
  draw () {
    var position = this.get('position')
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position)
      this.dom.style.left = pixel.getX() + 'px'
      this.dom.style.top = pixel.getY() + 'px'
    }
  }
  destroy () {
    this.dom.parentNode.removeChild(this.dom)
  }
}

export default MyCircle

