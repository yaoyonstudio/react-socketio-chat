import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IosSelect from 'iosselect'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import EXIF from 'exif-js'

import { getUser } from '../modules/user';
import { KTopbar } from '../libs/keact/Kui'

// const rotation = {
//    1: 'rotate(0deg)',
//    3: 'rotate(180deg)',
//    6: 'rotate(90deg)',
//    8: 'rotate(270deg)'
// }

//  function _arrayBufferToBase64(buffer) {
//    var binary = ''
//    var bytes = new Uint8Array(buffer)
//    var len = bytes.byteLength;
//    for (var i = 0; i < len; i++) {
//      binary += String.fromCharCode(bytes[i])
//    }
//    return window.btoa(binary);
//  }


//  var orientation = function(file, callback) {
//    var fileReader = new FileReader();
//    fileReader.onloadend = function() {
//      var base64img = "data:" + file.type + ";base64," + _arrayBufferToBase64(fileReader.result);
//      var scanner = new DataView(fileReader.result);
//      var idx = 0;
//      var value = 1; // Non-rotated is the default
//      if (fileReader.result.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
//        // Not a JPEG
//        if (callback) {
//          callback(base64img, value);
//        }
//        return;
//      }
//      idx += 2;
//      var maxBytes = scanner.byteLength;
//      while (idx < maxBytes - 2) {
//        var uint16 = scanner.getUint16(idx);
//        idx += 2;
//        switch (uint16) {
//          case 0xFFE1: // Start of EXIF
//            var exifLength = scanner.getUint16(idx);
//            maxBytes = exifLength - idx;
//            idx += 2;
//            break;
//          case 0x0112: // Orientation tag
//            // Read the value, its 6 bytes further out
//            // See page 102 at the following URL
//            // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
//            value = scanner.getUint16(idx + 6, false);
//            maxBytes = 0; // Stop scanning
//            break;
//        }
//      }
//      if (callback) {
//        callback(base64img, value);
//      }
//    }
//    fileReader.readAsArrayBuffer(file);
//  };

// function blobToDataURL(blob, callback) {
//   var a = new FileReader();
//   a.onload = function (e) { callback(e.target.result); }
//   a.readAsDataURL(blob);
// }

function rotateBase64Image(base64ImageSrc) {
  return new Promise((resolve, reject) => {
    var canvas = document.createElement("canvas");
    var img = new Image();
    img.src = base64ImageSrc;
    img.onload = function () {
      canvas.width = img.height;
      canvas.height = img.width;
      var context = canvas.getContext("2d");
      context.translate(img.height, img.width / img.height);
      context.rotate(Math.PI / 2);
      // console.log(img)
      context.drawImage(img, 0, 0); 
      // console.log(canvas.toDataURL('image/jpeg'))
      // return canvas.toDataURL('image/jpeg');
      
        resolve(canvas.toDataURL('image/png'))
    }
  });
}


function getCroppedImg(image, pixelCrop, fileName) {
  // console.log(image)
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    // canvas.toBlob(file => {
    //   file.name = fileName;
    //   resolve(file);
    // }, 'image/jpeg');

    resolve(canvas.toDataURL('image/jpeg'))
  });
}

class MyInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLayer: false,
      showLoading: false,
      showAvatarModify: false,
      uploadFile: null,
      crop: {},
      pixelCrop: {},
      info: {
        nickname: '',
        telephone: '',
        email: '',
        qq: '',
        company: '',
        job: '',
        slogan: '',
        gender: 1,
        birthday: '',
        education: '',
        address: '',
        province: '',
        city: '',
        district: '',
        laddress: '',
        lprovince: '',
        lcity: '',
        ldistrict: '',
        interest: ''
      },
      interests: [
        {id: 1, title: '篮球'},
        {id: 2, title: '足球'},
        {id: 3, title: '羽毛球'},
        {id: 4, title: '乒乓球'},
        {id: 5, title: '电影'},
        {id: 6, title: '音乐'},
        {id: 7, title: '旅游'},
        {id: 8, title: '健身'}
      ]
    }
    this.selectItem = this.selectItem.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.toggleLayer = this.toggleLayer.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.crop = this.crop.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.didCrop = this.didCrop.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.submit = this.submit.bind(this)
  }
  toggleLayer (e) {
    this.setState({
      showLayer: !this.state.showLayer,
      showAvatarModify: false
    })
  }

  selectItem (index) {
    let _interests = this.state.interests

    if (_interests[index].active) {
      _interests[index].active = !_interests[index].active
    } else {
      _interests[index].active = true
    }
    this.setState({
      ...this.state,
      interests: _interests
    })
    // if (this.state.interestArr.length) {

    // } else {
    //   let _interestArr = this.state.interestArr
    //   _interestArr.push(item)
    //   this.setState({
    //     ...this.state,
    //     interestArr: _interestArr
    //   })
    // }
  }

  changeValue (key, value) {
    this.setState({
      ...this.state,
      info: {
        ...this.state.info,
        [key]: value
      }
    })    
  }

  submit () {
    console.log(this.state.info)
  }

  fileChange (e) {
    // e.preventDefault()
    let that = this
    if (e.target.files.length) {
      this.setState({
        showLayer: true,
        showLoading: true
      })

      console.log('start:', new Date().getSeconds())
      let allTag = {}
      EXIF.getData(e.target.files[0], function () {
        allTag = EXIF.getAllTags(this)
        console.log('allTag:', allTag)
      })

      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function (data) {
        console.log('origin image data:', data.target)
        if (allTag.Orientation && allTag.Orientation === 6) {
          console.log('1')
          // console.log(rotateBase64Image(data.target.result))
          rotateBase64Image(data.target.result).then((baseData) => {
            console.log(baseData)
            that.setState({
              uploadFile: baseData,
              showAvatarModify: true
            })
          })
        } else {
          console.log('2')
          that.setState({
            uploadFile: data.target.result,
            showAvatarModify: true
          })
        }
        console.log('end:', new Date().getSeconds())
      }
    }
  }

  didCrop (e) {
    // e.preventDefault()
    console.log('pixelCrop did Crop:', this.state.pixelCrop)
    let image = document.querySelector('.ReactCrop__image')
    getCroppedImg(image, this.state.pixelCrop).then((blob) => {
      // console.log('blob', blob)
      const img = document.querySelector('#preview')
      // blob
      // const imageUrl = URL.createObjectURL(res)
      // img.addEventListener('load', () => URL.revokeObjectURL(imageUrl))
      // img.src = imageUrl

      // base 64
      // blobToDataURL(blob, (imgData) => {
      //   console.log(imgData)
      //   img.src = imgData
      // })
      
      img.src = blob
      // console.log(blob)
      console.log('这里上传图片')
      this.toggleLayer(e)

    })
  }
  onImageLoaded (image) {
    console.log('image:', image)
    this.setState({
      // showLoading: false,
      crop: makeAspectCrop({
        x: 25,
        y: (image.height - image.width * .5) / image.height * 100 / 2,
        aspect: 1 / 1,
        width: 50,
      }, image.width / image.height),
      image: {
        width: image.width,
        height: image.height,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight
      },
      pixelCrop: {
        x: Math.round((image.naturalWidth * 0.5 - image.naturalWidth * (25 / 100))),
        y: Math.round((image.naturalHeight * 0.5 - image.naturalWidth * (25 / 100)) ),
        width: Math.round(image.naturalWidth * (50 / 100)),
        height: Math.round(image.naturalWidth * (50 / 100)),
      }
    }, () => {
      this.setState({
        showLoading: false
      })
    })
    console.log('pixelCrop init:', this.state.pixelCrop)
  }
  crop (crop, pixelCrop) {
    console.log('crop:', crop)
    this.setState({ crop, pixelCrop })
  }
  onComplete(crop, pixelCrop) {
    console.log('complete')
    console.log('crop:', crop)
    console.log('pixelCrop:', pixelCrop)
  }

  render() {
    return (
      <div className="Container">
        <KTopbar back title="个人资料" bgcolor="#efefef" color="#666"></KTopbar>
        <div className="Main MyInfo fixedMain withFixedBottom">
          <header className="flex-r flex-c-b">
            <aside>我的头像</aside>
            <aside>
              <input type="file" name="file" onChange={(e) => this.fileChange(e)} id="file" />
              <img className="avatar" src={this.props.me.avatar} alt={this.props.me.username} />
            </aside>
          </header>
          <section className="MyInfo_form">
            <ul>
              <li>
                <label className="flex-r flex-c-b">
                  <span>用户名</span>
                  <aside className="unedit"><input type="text" disabled value={this.props.me.username} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>密码</span>
                  <aside><a>修改密码</a></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>性别</span>
                  <aside className="flex-r flex-c-e">
                    <p className="flexItem"></p>
                    <p className="flexItem flex-r flex-c-e">
                      <input type="radio" name="gender" value="1" checked={parseInt(this.state.info.gender, 10) === 1} onChange={(e) => this.changeValue('gender', parseInt(e.target.value, 10))} />男
                    </p>
                    <p className="flexItem flex-r flex-c-e">
                      <input type="radio" name="gender" value="2" checked={parseInt(this.state.info.gender, 10) === 2} onChange={(e) => this.changeValue('gender', parseInt(e.target.value, 10))} />女
                    </p>
                  </aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>昵称</span>
                  <aside><input type="text" placeholder="昵称" value={this.state.info.nickname} onChange={(e) => this.changeValue('nickname', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>手机</span>
                  <aside><input type="text" placeholder="手机" value={this.state.info.telephone} onChange={(e) => this.changeValue('telephone', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>邮箱</span>
                  <aside><input type="text" placeholder="邮箱" value={this.state.info.email} onChange={(e) => this.changeValue('email', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>QQ</span>
                  <aside><input type="text" placeholder="QQ" value={this.state.info.qq} onChange={(e) => this.changeValue('qq', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>生日</span>
                  <aside><input type="text" placeholder="生日" disabled value={this.state.info.birthday} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>学历</span>
                  <aside><input type="text" placeholder="学历" disabled value={this.state.info.education} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>家乡</span>
                  <aside><input type="text" placeholder="家乡" disabled value={this.state.info.address} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>所在地</span>
                  <aside><input type="text" placeholder="所在地" disabled value={this.state.info.laddress} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>公司</span>
                  <aside><input type="text" placeholder="公司" value={this.state.info.company} onChange={(e) => this.changeValue('company', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>职位</span>
                  <aside><input type="text" placeholder="职位" value={this.state.info.job} onChange={(e) => this.changeValue('job', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <div>
                  <textarea placeholder="个人签名" onChange={(e) => this.changeValue('slogan', e.target.value)}></textarea>
                </div>
              </li>
              <li>
                <div>
                  <span>兴趣</span>
                  <ul className="flex-r flex-s-s flex-wrap">
                    {this.state.interests && this.state.interests.map((item, index) => {
                      return (
                        <li onClick={() => this.selectItem(index)} key={index} className={'interestItem' + (item.active ? ' active' : '')}>{item.title}</li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            </ul>
          </section>
        </div>
        <footer className="fixedBottom">
          <button className="mainBtn" onClick={() => this.submit()}>提交修改</button>
        </footer>
        {this.state.showAvatarModify &&
          <div className="flex-c flex-c-c avatarModify">
            <ReactCrop src={this.state.uploadFile} keepSelection={true} crop={this.state.crop} onChange={(crop, pixelCrop) => this.crop(crop, pixelCrop)} onImageLoaded={(image) => this.onImageLoaded(image)} onComplete={(crop, pixelCrop) => this.onComplete(crop, pixelCrop)} />
            <img id="preview" alt="" />
            <footer>
              <button onClick={(e) => this.toggleLayer(e)}>取消</button>
              <button onClick={(e) => this.didCrop(e)}>确定</button>
            </footer>
          </div>
        }
        {this.state.showLoading && <img className="loading" alt="loading" src="/img/loading.gif" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user.me
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo)
