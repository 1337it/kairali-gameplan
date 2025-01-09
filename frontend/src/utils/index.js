export { default as dayjs } from './dayjs'

export function getImgDimensions(imgSrc) {
  return new Promise((resolve) => {
    let img = new Image()
    img.onload = function () {
      let { width, height } = img
      resolve({ width, height, ratio: width / height })
    }
    img.src = imgSrc
  })
}

export function htmlToText(html) {
  let tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export function copyToClipboard(text) {
  let textField = document.createElement('textarea')
  textField.value = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

export function getScrollParent(node) {
  if (node == null) {
    return null
  }

  if (node.scrollHeight > node.clientHeight) {
    return node
  } else {
    return getScrollParent(node.parentNode)
  }
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getPlatform() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('win') > -1) {
    return 'win'
  } else if (ua.indexOf('mac') > -1) {
    return 'mac'
  } else if (ua.indexOf('x11') > -1 || ua.indexOf('linux') > -1) {
    return 'linux'
  }
}
import { toast } from 'frappe-ui'
export function createToast(options) {
	toast({
	  position: 'bottom-right',
	  ...options,
	})
  }

 export function getCalendarDates (month=0,year=0) {
	let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	let firstDay = new Date(year, month, 1) 
	let leftPadding = firstDay.getDay()
	// debugger
	let datesInCurrentMonth = getCurrentMonthDates(firstDay)
	let datesInPreviousMonth = getBeforeDates(firstDay,leftPadding)
	let datesTillNow = [...datesInPreviousMonth,...datesInCurrentMonth]
	let datesInNextMonth = getNextMonthDates(datesTillNow)
	let allDates = [...datesTillNow,...datesInNextMonth]
	
	return allDates
	
	function getCurrentMonthDates(date) {
		let month = date.getMonth()
		if (month == 1 && isLeapYear(date)) {
			daysInMonth[month] = 29
		}

		let numberOfDays = daysInMonth[month] + 1
		let allDates = getDatesAfter(date,1,numberOfDays)
		return allDates
	}
	
	function getBeforeDates(firstDay,leftPadding) {
		let allDates = getDatesAfter(firstDay,0,leftPadding,-1)
		allDates = allDates.reverse()
		return allDates
	}
	
	function getNextMonthDates (currentAndPreviousMonthDates) {
		let lengthOfDates = currentAndPreviousMonthDates.length
		let lastDate = currentAndPreviousMonthDates[lengthOfDates-1]
		let diff = 42 - lengthOfDates + 1

		let allDates = getDatesAfter(lastDate, 1, diff, 1 ,true)
		return allDates
	}

	function getDatesAfter(date,startIndex,counter,stepper=1,getNextMonthDates=false) {

		let allDates = []
		for (let index = startIndex; index < counter; index++) {
			let tempDate = new Date(date.getFullYear(),getNextMonthDates ? date.getMonth() + 1 : date.getMonth() ,index*stepper)
            // debugger
			allDates.push(tempDate)
		}
        // debugger
		return allDates
	}

	function isLeapYear(date){
		let year = date.getFullYear()
		return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
	}
}

export function groupBy (obj,fn) {
	if (typeof fn !== 'function') throw new Error(`${fn} should be a function`)
	return Object.keys(obj).reduce((acc,key) => {
		const group = fn(obj[key])
		if (!acc[group]) {
			acc[group] = []
		}
		acc[group].push(obj[key])
		return acc
	},{})
}
