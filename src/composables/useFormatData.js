import moment from 'moment'

export function useFormatData() {
  function cpf(text) {
    if (!text) {
      return null
    } 

    const badchars = /[^\d]/g
    const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/
    const cpf = new String(text).replace(badchars, '')
    return cpf.replace(mask, '$1.$2.$3-$4')
  }

  function phone(phone) {
    if (phone != null) {
      phone = phone.replace(/[^\d]/g, '')

      if (phone.length === 11) {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      }

      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } else {
      return null
    }
  }

  function toBoolean(value) {
    if (value === 1) {
      return true
    }

    return false
  }

  function date(value, withTime = false) {
    if (value) {
      let format = withTime ? 'DD/MM/YYYY hh:mm:ss' : 'DD/MM/YYYY'
      return moment(value).format(format)
    }

    return null
  }

  function formatDate(value, originalFormat = 'DD/MM/YYYY', format = 'YYYY-MM-DD') {
    if (value) {
      return moment(value, originalFormat).format(format)
    }

    return null
  }

  function checkDateFormat(date, format = 'DD/MM/YYYY') {
    if (date) {
      const parsedDate = moment(date, format, true)
      return parsedDate.isValid()
    }
  }

  const isEmpty = (obj) => {
    if (obj === null || obj === undefined || Array.isArray(obj) || typeof obj !== 'object') {
      return true
    }
    return Object.getOwnPropertyNames(obj).length === 0
  }

  function getFileFormat(fileName) {
    const parts = fileName.split('.')
    if (parts.length > 1) {
      return parts[parts.length - 1]
    }
    return 'Unknown'
  }

  function isValidFormatFileMap(fileName) {
    return ['zip', 'kml', 'kmz'].includes(fileName.split('.').pop().toLowerCase())
  }

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]
      var y = b[key]
      return x < y ? -1 : x > y ? 1 : 0
    })
  }

  function isDateLessThanCurrent(date) {
    const selectedDate = new Date(date)
    const currentDate = new Date()

    return selectedDate < currentDate
  }

  function validateArrayEmpty(value) {
    return value.filter((value) => value !== '')
  }

  function formatNumberToFloat(value = 0, language = 'pt-BR', currency = 'BRL') {
    if (value == undefined || value == null) {
      return null
    }

    return new Intl.NumberFormat(language, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
      }).format(value);
  }

  function parseBrazilianDate(value, originalValue) {
    if (originalValue && typeof originalValue === 'string') {
      const [day, month, year] = originalValue.split('/')
      const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD', true).toDate()

      return date
    }

    return value
  }

  function limitedText(text, limit = 100) {
    if (text) {
      return text.length > limit ? `${text.substring(0, limit)}...` : text
    }

    return
  }

  function currentDate() {
    return moment().format('DD/MM/YYYY')
  }

  function isValidCpf(cpf) {
    let sum = 0
    let remainder

    let cleanCPF = String(cpf).replace(/[^\d]/g, '')

    if (cleanCPF.length !== 11) return false

    const invalidCPFs = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999'
    ]

    if (invalidCPFs.indexOf(cleanCPF) !== -1) return false

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false

    return true
  }

  function getValueColumnTable(row, column) {
    const value = column.field.split('.').reduce((acc, part) => acc && acc[part], row)
    return value || '-'
  }

  function removeNonDigits(input) {
    return input.replace(/\D/g, '');
  }

  function getInitialsFirstAndLast(fullName) {
    if (!fullName) return '';
  
    const names = fullName.trim().split(/\s+/);
    const firstInitial = names[0]?.[0] || '';
    const lastInitial = names[names.length - 1]?.[0] || '';
  
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  function cnpj(text) {
    const badchars = /[^\d]/g;
    const mask = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
    const cnpj = String(text).replace(badchars, '');
    return cnpj.replace(mask, '$1.$2.$3/$4-$5');
  }

  return {
    cpf,
    phone,
    toBoolean,
    date,
    isEmpty,
    getFileFormat,
    isValidFormatFileMap,
    sortByKey,
    isDateLessThanCurrent,
    validateArrayEmpty,
    formatNumberToFloat,
    parseBrazilianDate,
    checkDateFormat,
    formatDate,
    limitedText,
    currentDate,
    isValidCpf,
    getValueColumnTable,
    removeNonDigits,
    getInitialsFirstAndLast,
    cnpj
  }
}
