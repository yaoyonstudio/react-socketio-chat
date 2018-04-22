import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IosSelect from 'iosselect'
import { checkEmail, checkMobile } from '../libs/keact/Helper'
import { ShowToast } from '../libs/keact/Notification'
import { Link } from 'react-router-dom'

import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import EXIF from 'exif-js'

import { getUser, updateAvatar, updateUser } from '../modules/user';
import { KTopbar, KDateSelect, KZoneSelect } from '../libs/keact/Kui'

const educationData = [
  {id: 1, value: '博士'},
  {id: 2, value: '硕士'},
  {id: 3, value: '本科'},
  {id: 4, value: '大专'},
  {id: 5, value: '中专'},
  {id: 6, value: '高中'},
  {id: 7, value: '高中以下'},
]

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
        province: '',
        provinceId: 0,
        city: '',
        cityId: 0,
        district: '',
        districtId: 0,
        lprovince: '',
        lprovinceId: 0,
        lcity: '',
        lcityId: 0,
        ldistrict: '',
        ldistrictId: 0,
        interestIds: '',
        interests: ''
      },
      zoneStr: '',
      lzoneStr: '',
      educationId: 3,
      date: {
        year: {},
        month: {},
        day: {},
      },
      dateStr: '',
      zone: {
        province: {},
        city: {},
        district: {}
      },
      lzone: {
        province: {},
        city: {},
        district: {}
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
    this.selectZone = this.selectZone.bind(this)
    this.selectDate = this.selectDate.bind(this)
    this.showEducationSelector = this.showEducationSelector.bind(this)
    this.toggleLayer = this.toggleLayer.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.crop = this.crop.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.didCrop = this.didCrop.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount () {
    console.log(this.props)
    this.props.getUser({_id: this.props.me._id}, this.props.me.token, (res) => {
      console.log('res:', res)
      if (res.status) {
        // 初始化生日
        let myDate = new Date(res.data.birthday)
        let _birthday = {
          year: {
            id: myDate.getFullYear(),
            value: myDate.getFullYear() + '年'
          },
          month: {
            id: myDate.getMonth() + 1,
            value: (myDate.getMonth() + 1) + '月'
          },
          day: {
            id: myDate.getDate(),
            value: myDate.getDate() + '日'
          }
        }
        let _dateStr = _birthday.year.value + ' ' + _birthday.month.value + ' ' + _birthday.day.value
        
        // 初始化兴趣
        let _interests = this.state.interests
        if (res.data.interestIds) {
          let _selectedInterestsArr = res.data.interestIds.split(',')
          for (let i = 0, l = _interests.length; i < l; i++) {
            for (let j = 0, k = _selectedInterestsArr.length; j < k; j++) {
              if (parseInt(_interests[i].id, 10) === parseInt(_selectedInterestsArr[j], 10)) {
                _interests[i].active = true
              }
            }
          }
        }

        // 初始化学历
        let _educationId = 0
        for (let i = 0, l = educationData.length; i < l; i++) {
          if (educationData[i].value === res.data.education) {
            _educationId = educationData[i].id
          }
        }

        let { ..._info } = res.data
        delete _info.avatar
        delete _info.ctime
        delete _info.lastlogin
        delete _info.mtime

        this.setState({
          ...this.state,
          date: _birthday,
          dateStr: _dateStr,
          zone: {             // 初始化地区
            province: {
              id: parseInt(res.data.provinceId, 10),
              value: res.data.province
            },
            city: {
              id: parseInt(res.data.cityId, 10),
              value: res.data.city
            },
            district: {
              id: parseInt(res.data.districtId, 10),
              value: res.data.district
            }
          },
          lzone: {          // 初始化地区
            province: {
              id: parseInt(res.data.lprovinceId, 10),
              value: res.data.lprovince
            },
            city: {
              id: parseInt(res.data.lcityId, 10),
              value: res.data.lcity
            },
            district: {
              id: parseInt(res.data.ldistrictId, 10),
              value: res.data.ldistrict
            }
          },
          educationId: _educationId,
          zoneStr: res.data.province + ' ' + res.data.city + ' ' + res.data.district,
          lzoneStr: res.data.lprovince + ' ' + res.data.lcity + ' ' + res.data.ldistrict,
          interests: _interests,
          info: _info
        })
      } else {
        ShowToast(res.msg, 2000)
      }
    })
  }

  showEducationSelector () {
    new IosSelect(1, 
      [educationData],
      {
        container: '.container',
        title: '选择学历',
        itemHeight: 50,
        itemShowCount: 3,
        oneLevelId: this.state.educationId,
        callback: (selectOneObj) => {
          this.setState({
            ...this.state,
            info: {
              ...this.state.info,
              education: selectOneObj.value
            }
          })
        }
    })
  }

  selectDate (_year, _month, _day, field) {
    this.setState({
      ...this.state,
      [field]: {
        year: _year,
        month: _month,
        day: _day
      }
    }, () => {
      this.setState({
        ...this.state,
        dateStr: this.state.date.year.value + ' ' + this.state.date.month.value + ' ' + this.state.date.day.value,
        info: {
          ...this.state.info,
          birthday: this.state.date.year.id + '-' + this.state.date.month.id + '-' + this.state.date.day.id
        }
      })
    })
  }

  selectZone (_province, _city, _district, field) {
    this.setState({
      ...this.state,
      [field]: {
        province: _province,
        city: _city,
        district: _district
      }
    }, () => {
      if (field === 'zone') {
        this.setState({
          ...this.state,
          zoneStr: this.state.zone.province.value + ' ' + this.state.zone.city.value + ' ' + this.state.zone.district.value,
          info: {
            ...this.state.info,
            province: this.state.zone.province.value,
            provinceId: this.state.zone.province.id,
            city: this.state.zone.city.value,
            cityId: this.state.zone.city.id,
            district: this.state.zone.district.value,
            districtId: this.state.zone.district.id
          }
        })
      } else if (field === 'lzone') {
        this.setState({
          ...this.state,
          lzoneStr: this.state.lzone.province.value + ' ' + this.state.lzone.city.value + ' ' + this.state.lzone.district.value,
          info: {
            ...this.state.info,
            lprovince: this.state.lzone.province.value,
            lprovinceId: this.state.lzone.province.id,
            lcity: this.state.lzone.city.value,
            lcityId: this.state.lzone.city.id,
            ldistrict: this.state.lzone.district.value,
            ldistrictId: this.state.lzone.district.id
          }
        })
      }
    })
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
    // 如果有手机或邮箱数据，需要进行验证
    if (this.state.info.telephone) {
      if (!checkMobile(this.state.info.telephone)) {
        ShowToast('手机号码格式不正确', 1500)
        return
      }
    }
    if (this.state.info.email) {
      if (!checkEmail(this.state.info.email)) {
        ShowToast('邮箱格式不正确', 1500)
        return
      }
    }

    // 获取并赋值兴趣项数据
    const selectInterestItems = this.state.interests
      .filter(item => item.active)
    let _interestIds = selectInterestItems.reduce((resultStr, item, index) => resultStr + (index ? ',' : '') + item.id, '')
    let _interestTitles = selectInterestItems.reduce((resultStr, item, index) => resultStr + (index ? ',' : '') + item.title, '')
    this.setState({
      ...this.state,
      info: {
        ...this.state.info,
        interestIds: _interestIds,
        interests: _interestTitles
      }
    }, () => {
      console.log(this.state.info)
      this.props.updateUser(this.props.me._id, this.state.info, this.props.me.token, (res) => {
        ShowToast(res.msg, 2000)
      })
    })

  }

  fileChange (e) {
    // e.preventDefault()
    let that = this
    if (e.target.files.length) {
      this.setState({
        showLayer: true,
        showLoading: true
      })

      // console.log('start:', new Date().getSeconds())
      let allTag = {}
      EXIF.getData(e.target.files[0], function () {
        allTag = EXIF.getAllTags(this)
        // console.log('allTag:', allTag)
      })

      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function (data) {
        // console.log('origin image data:', data.target)
        if (allTag.Orientation && allTag.Orientation === 6) {
          // console.log(rotateBase64Image(data.target.result))
          rotateBase64Image(data.target.result).then((baseData) => {
            console.log(baseData)
            that.setState({
              uploadFile: baseData,
              showAvatarModify: true
            })
          })
        } else {
          that.setState({
            uploadFile: data.target.result,
            showAvatarModify: true
          })
        }
        // console.log('end:', new Date().getSeconds())
      }
    }
  }

  didCrop (e) {
    // e.preventDefault()
    // console.log('pixelCrop did Crop:', this.state.pixelCrop)
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
      // console.log('这里上传图片')
      this.props.updateAvatar({
        img: blob
      }, this.props.me.token, (res) => {
        ShowToast(res.msg, 2000)
      })
      this.toggleLayer(e)
    })
  }
  onImageLoaded (image) {
    // console.log('image:', image)
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
    // console.log('pixelCrop init:', this.state.pixelCrop)
  }
  crop (crop, pixelCrop) {
    this.setState({ crop, pixelCrop })
  }
  onComplete(crop, pixelCrop) {
    // console.log('complete')
    // console.log('crop:', crop)
    // console.log('pixelCrop:', pixelCrop)
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
                  <aside><Link to="/modify_password">修改密码</Link></aside>
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
                  <aside><input type="telephone" placeholder="手机" value={this.state.info.telephone} onChange={(e) => this.changeValue('telephone', e.target.value)} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>邮箱</span>
                  <aside><input type="email" placeholder="邮箱" value={this.state.info.email} onChange={(e) => this.changeValue('email', e.target.value)} /></aside>
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
                  <aside><KDateSelect color="#0a8acd" date={this.state.date} dateStr={this.state.dateStr} field='date' height=".28rem;" select={(_year, _month, _day, field) => this.selectDate(_year, _month, _day, field)}></KDateSelect></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>学历</span>
                  <aside onClick={() =>this.showEducationSelector()}><input type="text" className="select" placeholder="请选择学历" disabled value={this.state.info.education} /></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>家乡</span>
                  <aside><KZoneSelect color="#0a8acd" zoneStr={this.state.zoneStr} zone={this.state.zone} field='zone' height=".28rem;" select={(_province, _city, _district, field) => this.selectZone(_province, _city, _district, field)}></KZoneSelect></aside>
                </label>
              </li>
              <li>
                <label className="flex-r flex-c-b">
                  <span>所在地</span>
                  <aside><KZoneSelect color="#0a8acd" zoneStr={this.state.lzoneStr} zone={this.state.lzone} field='lzone' height=".28rem;" select={(_province, _city, _district, field) => this.selectZone(_province, _city, _district, field)}></KZoneSelect></aside>
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
                  <textarea placeholder="个人签名" value={this.state.info.slogan} onChange={(e) => this.changeValue('slogan', e.target.value)}></textarea>
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
      getUser,
      updateAvatar,
      updateUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo)
