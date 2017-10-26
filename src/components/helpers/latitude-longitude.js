function convertMilitaryTime(militaryTime) {
  const minutes = militaryTime.slice(3,5)
  const militaryHour = militaryTime.substring(0,2)
  const time = {}
  let counter = 1
  for(let i = 13; i < 25; i++) {
    time[i] = counter
    counter++
  }
  if (time.hasOwnProperty(parseFloat(militaryTime))) {
    return (time[parseFloat(militaryTime)] + ':' + minutes)
  }
}

export const metersPerSecToMilesPerHour = ms => {
  return (ms * 2.236936).toFixed(2)
}

export const convertKelvinToFahr = kelvin => {
  return (kelvin * (9/5) - 459.67).toFixed(2)
}

export const getLong = string => {
    if (!string) return
    const coordinates = string.split(':')
    const long = parseFloat(coordinates[2].split(','))
    return long
}

export const getLat = string => {
  if (!string) return
  const coordinates = string.split(':')
  const lat = parseFloat(coordinates[1].slice(','))
  return lat
}

export const unixToTimeStamp = unix => {
  const formatted = new Date(unix * 1000).toString()
  const splitted = formatted.split(' ')
  if (splitted[4].charAt(0) == 0) {
    return splitted[4].slice(1,5) + ' AM'
  }

  if (splitted[4].slice(0,2) >= 10 && splitted[4].slice(0,2) <= 12) {
    return splitted[4].slice(1,5) + ' AM'
  } else {
    return convertMilitaryTime(splitted[4]) + ' PM'
  }
}
