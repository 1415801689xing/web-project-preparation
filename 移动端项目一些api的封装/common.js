var szy = {
  /**
   *
   *入口函数
   * @param {Function} fn
   */
  ready: function(fn) {
    if (
      document.attachEvent
        ? document.readyState === 'complete'
        : document.readyState !== 'loading'
    ) {
      fn()
    } else {
      document.addEventListener('DOMContentLoaded', fn, false)
    }
  },

  /**
   * 判断当前是否是安卓手机
   */
  is_android: function() {
    var ua = navigator.userAgent.toLocaleLowerCase()
    return ua.indexOf('android') > -1 || ua.indexOf('linux') > -1
  },
  /**
   * 判断当前是否是苹果手机
   */
  is_iphone: function() {
    var ua = navigator.userAgent.toLocaleLowerCase()
    return (
      ua.indexOf('iphone') > -1 ||
      ua.indexOf('ipad') > -1 ||
      ua.indexOf('ipod') > -1 ||
      ua.indexOf('macintosh') > -1
    )
  },
  /**
   * 判断是否是iponeX
   */
  isIphoneX: function() {
    return (
      (is_iphone() &&
        window.screen.availHeight == 812 &&
        window.screen.availWidth == 375) ||
      (window.screen.availHeight == 375 && window.screen.availWidth == 812)
    )
  },
  /**
   * 判断是否ios版本的微信
   */
  isIosAndWX: function() {
    var ua = navigator.userAgent.toLocaleLowerCase()
    return is_iphone() && ua.indexOf('micromessenger') > -1
  },

  /**
   * 判断是否是手机
   */
  is_mobile: function() {
    var sUserAgent = navigator.userAgent.toLowerCase()
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp'
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
    var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
    var bIsAndroid = sUserAgent.match(/android/i) == 'android'
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
    return (
      bIsIpad ||
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM
    )
  },

  //
  /**
   *
   *  截取url的参数值
   * @param {String} urla
   * @param {String} name
   * @returns
   */
  getUrlQueryString: function(urla, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = urla.substr(1).match(reg) // 获取url中"?"符后的字符串并正则匹配
    var context = ''
    if (r != null) {
      context = r[2]
    }
    reg = null
    r = null
    return context == null || context == '' || context == 'undefined'
      ? ''
      : context
  },

  /**
   *
   *动态加载js
   * @param {String} url
   * @param {Function} callback
   */
  loadScript: function(url, callback) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = function() {
      callback()
    }
    script.src = url
    document.body.appendChild(script)
  },

  /**
   *
   * 获取浏览器版本号
   * @returns
   */
  getOsVersion: function() {
    var u = navigator.userAgent,
      version = ''
    if (u.indexOf('Mac OS X') > -1) {
      // ios
      var regStr_saf = /OS [\d._]*/gi
      var verinfo = u.match(regStr_saf)
      version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')
    } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // android
      version = u.substr(
        u.indexOf('Android') + 8,
        u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8
      )
    } else if (u.indexOf('BB10') > -1) {
      // 黑莓bb10系统
      version = u.substr(
        u.indexOf('BB10') + 5,
        u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5
      )
    } else if (u.indexOf('IEMobile')) {
      // windows phone
      version = u.substr(
        u.indexOf('IEMobile') + 9,
        u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9
      )
    }
    return version
  },

  /**
   *
   *  加法
   * @param {Number} a
   * @param {Number} b
   * @returns a+b的值
   */
  add: function(a, b) {
    var c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return (
      (e = Math.pow(10, Math.max(c, d))), (this.mul(a, e) + this.mul(b, e)) / e
    )
  },

  /**
   *
   * 减法
   * @param {Number} a
   * @param {Number} b
   * @returns a-b的值
   */
  sub: function(a, b) {
    var c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    return (
      (e = Math.pow(10, Math.max(c, d))), (this.mul(a, e) - this.mul(b, e)) / e
    )
  },

  /**
   *
   * 乘法
   * @param {Number} a
   * @param {Number} b
   * @returns a*b的值
   */
  mul: function(...costArr) {
    var _productCost = 1
  	var multiple = 0
  	for (var index = 0; index < costArr.length; index++) {
    	var costStr = costArr[index].toString()
    	multiple += costStr.split('.')[1].length
    	_productCost *= Number(costStr.replace('.', ''))
  	}
  	return (
    	parseFloat(_productCost / Math.pow(10, multiple)).toFixed(2)
  	)
  },

  /**
   *
   * 除法
   * @param {Number} a
   * @param {Number} b
   * @returns
   */
  div: function(a, b) {
    var c
    var d
    var e = 0
    var f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {}
    return (
      (c = Number(a.toString().replace('.', ''))),
      (d = Number(b.toString().replace('.', ''))),
      this.mul(c / d, Math.pow(10, f - e))
    )
  },

  /**
   *
   * 判断是否为一个数组
   * @param {*} value
   * @returns
   */
  isArray: function iArray(value) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(value)
    } else {
      return Object.prototype.toString.call(value) === '[object Array]'
    }
  },

  /**
   * 手机号码隐藏中间四位
   *
   * @param {String} phone
   * @returns
   */
  formatPhone: function(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },

  /**
   *
   * 验证手机号
   * @param {String} phone
   * @returns
   */
  checkPhone: function(phone) {
    return /^((1(([3-8][0-9])|99))+\d{8})$/.test(phone)
  },

  /**
   *
   * 银行卡号验证
   * @param {String} bankno
   * @returns
   */
  checkBankNo: function(bankno) {
    if (bankno.length < 16 || bankno.length > 19) {
      return '银行卡号长度必须在16到19之间'
    }
    // 开头6位
    var strBin =
      '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
    if (strBin.indexOf(bankno.substring(0, 2)) === -1) {
      return '银行卡号开头6位不符合规范'
    }
    // Luhn校验
    var luhnValid = checkluhn(bankno)
    if (luhnValid) {
      return luhnValid
    }
    return false
  },

  /**
   *
   * 身份证号验证
   * @param {String} ID
   * @returns
   */
  checkID: function(ID) {
    if (typeof ID !== 'string') return '不合法身份证'
    var city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    var birthday =
      ID.substr(6, 4) +
      '/' +
      Number(ID.substr(10, 2)) +
      '/' +
      Number(ID.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday =
      d.getFullYear() +
      '/' +
      Number(d.getMonth() + 1) +
      '/' +
      Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var i
    var residue

    if (!/^\d{17}(\d|x)$/i.test(ID)) return '不合法身份证'
    if (city[ID.substr(0, 2)] === undefined) return '不合法身份证'
    if (time >= currentTime || birthday !== newBirthday) return '不合法身份证'
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== ID.substr(17, 1)) return '不合法身份证'

    // return city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女")
    return false
  },

  /**
   *
   * webp兼容判断
   * @returns
   */
  supportWebp: function() {
    if (typeof window === 'undefined') return false
    var support = true
    var d = document
    try {
      var el = d.createElement('object')
      el.type = 'image/webp'
      el.style.visibility = 'hidden'
      el.innerHTML = '!'
      d.body.appendChild(el)
      support = !el.offsetWidth
      d.body.removeChild(el)
    } catch (err) {
      support = false
    }
    return support
  }
}
ready(function() {
  // fastclick实例化
  FastClick.attach(document.body)
})
/* 银行卡号Luhn校验算法 */
// luhn校验规则：16位银行卡号（19位通用）:
// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。
function checkluhn(bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1) // 取出最后一位（与luhn进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1) // 前15或18位
  var newArr = []
  for (var i = first15Num.length - 1; i > -1; i--) {
    // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  var arrJiShu = [] // 奇数位*2的积 <9
  var arrJiShu2 = [] // 奇数位*2的积 >9

  var arrOuShu = [] // 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 === 1) {
      // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2)
      else arrJiShu2.push(parseInt(newArr[j]) * 2)
    } else arrOuShu.push(newArr[j]) // 偶数位
  }

  var jishuChild1 = [] // 奇数位*2 >9 的分割之后的数组个位数
  var jishuChild2 = [] // 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishuChild1.push(parseInt(arrJiShu2[h]) % 10)
    jishuChild2.push(parseInt(arrJiShu2[h]) / 10)
  }

  var sumJiShu = 0 // 奇数位*2 < 9 的数组之和
  var sumOuShu = 0 // 偶数位数组之和
  var sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }

  for (var p = 0; p < jishuChild1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p])
  }
  // 计算总和
  sumTotal =
    parseInt(sumJiShu) +
    parseInt(sumOuShu) +
    parseInt(sumJiShuChild1) +
    parseInt(sumJiShuChild2)

  // 计算luhn值
  var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
  var luhn = 10 - k

  if (+lastNum === luhn) {
    return false
  } else {
    // layer.msg("银行卡号必须符合luhn校验");
    return '银行卡号不合法,请仔细检查是否正确'
  }
}

/**
 *
 * 请求抛出的错误
 * @param {Object} err
 */
function ajaxErr(err) {
  if (err) {
    switch (err.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = '连接错误'
    }
  } else {
    err.message = '连接到服务器失败'
  }
  // 错误的提示，这里可以换成自己的toast、alert动画
  alert(err.message)
}

szy.ready(function() {
  // 解决ios跳转出去，点击返回页面不刷新的问题
  var isPageHide = false
  window.addEventListener('pageshow', function() {
    if (isPageHide) {
      window.location.reload()
    }
  })
  window.addEventListener('pagehide', function() {
    isPageHide = true
  })
})
