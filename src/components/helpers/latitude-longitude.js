export default {
  getLong: (string) => {
    if (!string) return
    const coordinates = string.split(':')
    const long = parseFloat(coordinates[2].split(','))
    return long
  },
  getLat: (string) => {
    if (!string) return
    const coordinates = string.split(':')
    const lat = parseFloat(coordinates[1].slice(','))
    return lat
  }
}
