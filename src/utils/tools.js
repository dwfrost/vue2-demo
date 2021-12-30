// import mixins from './mixins'

/**
 * 工具函数，常量库
 */
const ua = navigator.userAgent
export const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

/**
 * @param {Number} date 例如 1535465828920
 */
export function timestampToTime(date, format = 'yyyy-MM-dd hh:mm:ss') {
  if (isNaN(date)) {
    // throw new Error('请传入数字')
    return ''
  }
  date = `${date}`.length === 13 ? date : date * 1000
  var time = new Date(date)
  return formatDate(time, format)
}

export function transFiletoImg(fileContent) {
  const arrayBuffer = new Uint8Array(fileContent)
  let binary = ''
  const bytes = new Uint8Array(arrayBuffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

/**
 * @param { String } date 传入日期
 * @param { String } format 期待的格式 如yyyy-MM-dd hh:mm:ss
 */
export function formatDate(date, format) {
  if (!date || date === '0') {
    return ''
  }
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }
  if (typeof date === 'string') {
    let arr
    if (date.length === 8) {
      arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2)]
    } else if (date.length === 14) {
      arr = [
        date.substr(0, 4),
        date.substr(4, 2),
        date.substr(6, 2),
        date.substr(8, 2),
        date.substr(10, 2),
        date.substr(12, 2)
      ]
    } else {
      arr = date.split(/[^0-9]+/)
    }

    format = format.replace(/([a-z])\1+/gi, function(all, $1) {
      let result = {
        y: ~~arr[0],
        M: ~~arr[1],
        d: ~~arr[2],
        h: ~~arr[3],
        m: ~~arr[4],
        s: ~~arr[5]
      }[$1]
      if (result !== undefined && result < 10) {
        result = '0' + result
      }
      return result || ''
    })
    return format
  }
  format = format.replace(/([a-z])\1+/gi, function(all) {
    const first = all.charAt(0)
    if ('y M d h m s'.indexOf(first) >= 0) {
      if (first === 'y') {
        return all.length > 2
          ? date.getFullYear()
          : (date.getFullYear() + '').substr(2)
      }
      let result = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
      }[first]
      result !== undefined && result < 10 && (result = '0' + result)
      return result
    } else {
      return all
    }
  })
  return format
}

/**
 * 对对象数组，按属性排序
 * @param { Array } list 传入数组，选项是对象
 * @param { String } prop 属性名
 * @param { String } type 排序类型 默认up升序，传入down降序
 * 用法如：list.sort(compare('age')) ==> 对list按age排序
 */
export function compareByProp(list = [], prop, type = 'up') {
  return list.sort((obj1, obj2) => {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return type === 'up' ? -1 : 1
    } else if (val1 > val2) {
      return type === 'up' ? 1 : -1
    } else {
      return 0
    }
  })
}

/**
 * 复制到剪切板
 * @param {String,Number} inputValue 要复制的值
 */
export function copyText(inputValue) {
  if (typeof inputValue !== 'string' && typeof inputValue !== 'number') return
  inputValue = `${inputValue}` // 全部转为string类型

  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', inputValue)
  input.select()
  input.setSelectionRange(0, inputValue.length)
  const copyRes = document.execCommand('copy')
  // const msg = copyRes ? '复制完成' : '您的应用不支持复制'
  // mixins.methods.notify(msg)
  document.body.removeChild(input)
  return Boolean(copyRes)
}

/**
 * 得到URL的name参数
 * @param {String} name 要查询的参数key
 */
export function getUrlHash(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
/**
 * 得到URL的name参数
 * @param {String} name 要查询的参数key
 * @param {String} url 非必传，默认当前页面url
 */
export function getUrlParam(key, url = location.href) {
  var paramsObj = parseUrlStrParamsToObj(url)
  return key ? paramsObj[key] : paramsObj
}

/**
 * 将url转换为对象
 * @param {String} url 非必传，默认当前页面url
 */
export function parseUrlStrParamsToObj(url = location.href) {
  // let strParams = decodeURIComponent(url).split('?')[1]
  let strParams = url.split('?')[1]
  let result = {}

  if (strParams) {
    strParams.split('&').forEach(item => {
      let keyValue = item.split('=')
      let hashIndex = (keyValue[1] || '').indexOf('#')

      let value = ~hashIndex ? keyValue[1].substring(0, hashIndex) : keyValue[1]

      result[keyValue[0]] = decodeURIComponent(value)
    })
  }

  return result
}

/**
 * 将point转为小数位数
 * @param {Number,String} point 比如0.1 0.01
 */
export function getDigit(point) {
  point = `${point}`
  if (point.includes('1e-')) {
    return point.replace('1e-', '')
  }
  const digitStr = point.split('.')[1]
  return digitStr ? digitStr.length : 0
}

/**
 * 格式化为百分比
 * @param {String,Number} num 传入数字
 * @param {Number} digit 保留小数点位数
 * @param {Boolean} isSlice 是否截取小数点位数后面的，举例：0.12125,如true,得12.12%;如false,得12.13%(四舍五入)
 * @param {Boolean} isAddSign 正数是否需要加上
 */
export function formatPercent(
  num,
  digit = 2,
  isSlice = true,
  isAddSign = false
) {
  if (Number.isNaN(+num)) {
    return num
  }
  num = +num
  if (isSlice) {
    num =
      num > 0
        ? Math.floor(num * 100 * Math.pow(10, digit)) / Math.pow(10, digit)
        : Math.ceil(num * 100 * Math.pow(10, digit)) / Math.pow(10, digit)
  } else {
    num = Math.round(num * 100 * Math.pow(10, digit)) / Math.pow(10, digit)
  }
  num = isAddSign && num > 0 ? `+${num}` : num
  return num + '%'
}
