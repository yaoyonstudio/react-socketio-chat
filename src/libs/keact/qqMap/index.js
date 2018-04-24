// import MyCircle from './MyCircle'
/* eslint-disable no-unexpected-multiline, func-call-spacing, no-unused-vars, no-cond-assign, no-new  */

function textSize (fontSize, text) {
  var span = document.createElement('span')
  var result = {}
  result.width = span.offsetWidth
  result.height = span.offsetWidth
  span.style.visibility = 'hidden'
  span.style.fontSize = fontSize
  document.body.appendChild(span)
  if (typeof span.textContent !== 'undefined') {
    span.innerHTML = text
  } else {
    span.innerHTML = text
  }
  result.width = span.offsetWidth - result.width
  result.height = span.offsetHeight - result.height
  span.parentNode.removeChild(span)
  return result
}

export function cCoords (lat, lng) {
  if (!window.qq || !lat || !lng) return
  return new window.qq.maps.LatLng(lat, lng)
}

export function loadMapScript (callback) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://map.qq.com/api/js?v=2.exp&key=VOVBZ-W62RK-G3KJA-A4PGF-4LWVS-QIBJC&callback=init'
  document.body.appendChild(script)
  if (callback) {
    callback()
  }
}

// 添加圆
// createCircle(map, myLatlng, {
//   radius: 2000
// }, () => {
//   console.log('点击了圆')
// })
export function createCircle (map, myLatlng, style, callback) {
  let circleStyle = {
    radius: style.radius || 2000,
    fillColor: style.fillColor || '#fe5318',
    strokeWeight: style.strokeWeight || 0,
    strokeColor: style.strokeColor || '#d33',
    strokeDashStyle: style.strokeDashStyle || 'solid',
    visible: style.visible || true
  }
  if (!window.qq) return
  let circle = new window.qq.maps.Circle({
    map: map,
    center: myLatlng,
    ...circleStyle
  })
  if (typeof callback === 'function') {
    window.qq.maps.event.addListener(circle, 'click', callback)
  }
}

export function circleOverlay (opts) {
  window.qq.maps.Overlay.call(this, opts)
}
export function initMyCircle (myOverlay) {
  myOverlay.prototype = new window.qq.maps.Overlay()
  myOverlay.prototype.construct = function () {
    this.dom = document.createElement('div')
    this.dom.style.cssText = 'background: rgba(254, 83, 24, .9); color: #fff; font-size: 12px; position:absolute;' +
      'text-align:center; width: 70px; height: 70px; border-radius: 100%;' +
      'display: flex; align-items: center; justify-content: center;'
    this.dom.innerHTML = this.get('inithtml')
    this.getPanes().overlayLayer.appendChild(this.dom)
  }
  myOverlay.prototype.html = function (html) {
    this.dom.innerHTML = html
  }
  myOverlay.prototype.draw = function () {
    var position = this.get('position')
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position)
      this.dom.style.left = pixel.getX() + 'px'
      this.dom.style.top = pixel.getY() + 'px'
    }
  }
  myOverlay.prototype.destroy = function () {
    this.dom.parentNode.removeChild(this.dom)
  }
}

export function tagOverlay (opts) {
  window.qq.maps.Overlay.call(this, opts)
}
export function initMyTag (myOverlay) {
  myOverlay.prototype = new window.qq.maps.Overlay()
  myOverlay.prototype.construct = function () {
    this.dom = document.createElement('div')
    this.dom.style.cssText =
      'background: rgba(254, 83, 24, .9); color: #fff; font-size: 12px; position:absolute;' +
      'text-align:center; padding: 0 6px; min-width: 120px; max-width: 180px; height: 30px; border-radius: 4px;' +
      'display: flex; align-items: center; justify-content: center;'
    // this.dom.innerHTML = this.get('inithtml') + '<i style="display: block; width: 0; height: 0; border-width: 7px 6px 0; border-style: solid; border-color: rgba(254, 83, 24, .9) transparent transparent; position: absolute; top: 29px; left: 7px;"></i>'
    let t1Html = this.get('t1')
    let t2Html = this.get('t2')
    // t1Html.style.cssText = 'max-width: 100px; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;'
    let t1P = document.createElement('p')
    let t2P = document.createElement('p')
    t1P.style.cssText = 'max-width: 90px; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-right: 5px;'
    t1P.innerHTML = t1Html
    t2P.innerHTML = t2Html
    let domText = t1Html + ' ' + t2Html
    this.dom.appendChild(t1P)
    this.dom.appendChild(t2P)
    this.dom.innerHTML += '<i style="display: block; width: 0; height: 0; border-width: 7px 6px 0; border-style: solid; border-color: rgba(254, 83, 24, .9) transparent transparent; position: absolute; top: 29px; left: 7px;"></i>'
    this.dom.style.cssText += 'width: ' + (textSize('12px', domText).width + 20) + 'px'
    this.getPanes().overlayLayer.appendChild(this.dom)
  }
  myOverlay.prototype.html = function (html) {
    this.dom.innerHTML = html
  }
  myOverlay.prototype.draw = function () {
    var position = this.get('position')
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position)
      this.dom.style.left = pixel.getX() + 'px'
      this.dom.style.top = pixel.getY() + 'px'
    }
  }
  myOverlay.prototype.destroy = function () {
    this.dom.parentNode.removeChild(this.dom)
  }
}

export function clearOverlays (overlays) {
  var overlay
  while (overlay = overlays.pop()) {
    overlay.setMap(null)
  }
}

export function createInfo (map, latLng, html) {
  var infoWin = new window.qq.maps.InfoWindow({
    map: map
  })
  infoWin.open()
  infoWin.setPosition(latLng)
  infoWin.setContent(html)
}

export function CustomOverlay (myOverlay) {
  myOverlay.prototype = new window.qq.maps.Overlay()
  myOverlay.prototype.construct = function () {
    this.dom = document.createElement('div')
    this.dom.style.cssText = 'background: rgba(0, 0, 0, .7); border-radius: 4px; color: #fff; ' +
      'width: 200px; padding: 10px; position:absolute; ' +
      'display: flex; align-items: center; justify-content: flex-start; margin-left: -100px; margin-top: -110px;'
    this.dom.innerHTML = this.get('inithtml')
    var panes = this.getPanes()
    // panes.overlayLayer.appendChild(this.dom)
    panes.overlayMouseTarget.appendChild(this.dom)
    this.dom.onclick = function (event) {
      console.log('click')
      console.log(this.querySelector('#navLink').getAttribute('data-url'))
      event.preventDefault()
      event.stopPropagation()
      let url = this.querySelector('#navLink').getAttribute('data-url')
      if (url) {
        window.location.href = url
      }
      // this.querySelector('#navLink').addEventListener('click', (e) => {
      //   e.preventDefault()
      //   e.stopPropagation()
      //   console.log('dddd')
      // })
    }
  }
  myOverlay.prototype.html = function (html) {
    this.dom.innerHTML = html
  }
  myOverlay.prototype.draw = function () {
    var position = this.get('position')
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position)
      this.dom.style.left = pixel.getX() + 'px'
      this.dom.style.top = pixel.getY() + 'px'
    }
  }
  myOverlay.prototype.destroy = function () {
    this.dom.parentNode.removeChild(this.dom)
  }
}

export function zbMainInfo (map, latLng, html) {
  var MyOverlay = function (opts) {
    window.qq.maps.Overlay.call(this, opts)
  }
  CustomOverlay(MyOverlay)
  let a = new MyOverlay({
    map: map,
    position: latLng,
    inithtml: html
  })
}

export function poi (markers, map, search, latLng, radius) {
  var searchService = []
  // var markers = []
  clearOverlays(markers)
  searchService = new window.qq.maps.SearchService({
    // 检索成功的回调函数
    complete: function (results) {
      // 设置回调函数参数
      var pois = results.detail.pois
      var infoWin = new window.qq.maps.InfoWindow({
        map: map
      })
      var latlngBounds = new window.qq.maps.LatLngBounds()
      for (var i = 0, l = pois.length; i < l; i++) {
        var poi = pois[i]
        // 扩展边界范围，用来包含搜索到的Poi点
        latlngBounds.extend(poi.latLng);
        (function (n) {
          var marker = new window.qq.maps.Marker({
            map: map
          })
          var icon = new window.qq.maps.MarkerImage(
            '/static/img/zb/mark' + search.type + '.png',
            new window.qq.maps.Size(68, 88),
            new window.qq.maps.Point(0, 0),
            new window.qq.maps.Point(17, 44),
            new window.qq.maps.Size(34, 44)
          )
          marker.setPosition(pois[n].latLng)
          marker.setIcon(icon)
          marker.setTitle(i + 1)
          markers.push(marker)

          window.qq.maps.event.addListener(marker, 'click', function () {
            infoWin.open()
            infoWin.setContent('<div style="width:200px;height:60px; font-size: 12px;">' + pois[n].name + '<br />' + pois[n].address + '</div>')
            infoWin.setPosition(pois[n].latLng)
          })
        })(i)
      }
      // 调整地图视野
      map.fitBounds(latlngBounds)
    },
    // 若服务请求失败，则运行以下函数
    error: function () {
      alert('出错了')
    }
  })

  searchService.searchNearBy(search.keyword, latLng, radius)
}

export function getCurLocation (success, error) {
  var geolocation = new window.qq.maps.Geolocation()
  var options = { timeout: 9000 }
  geolocation.getLocation(success, error, options)
}

export function getPanorama (el, lat, lng) {
  var panoLatLng = new window.qq.maps.LatLng(lat, lng)
  var panoService = new window.qq.maps.PanoramaService()
  panoService.getPano (panoLatLng, 1000, function (result) {
    if (result && result.svid) {
      var pano = new window.qq.maps.Panorama(document.getElementById(el))
      setTimeout(() => {
        pano.setPano(result.svid)
      }, 0)
    }
    // var x1 = result.latlng.lng;
    //   var y1 = result.latlng.lat;
    //   var x2 = 116.326088;
    //   var y2 = 39.882326;
    //   var alpha = Math.acos((y2 - y1) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))
    // if (x2 - x1 < 0) {
    //   alpha = Math.PI * 2 - alpha
    // }
    // 修改场景的俯仰角
    // pano.setPov({heading : alpha/Math.PI*180, pitch : 0})
  })
}
