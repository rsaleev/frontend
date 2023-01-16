import moment from 'moment'

export function formatDateTime(arg) {
  let dateTimeObject = new Date(arg)
  let dateString = moment(dateTimeObject).format('DD/MM/YY')
  return dateString
}
