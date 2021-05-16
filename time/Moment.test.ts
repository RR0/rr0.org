import {Moment} from "../time/Moment"

test('parse ISO date', () => {
  const isoDate = "1972-08-12"
  const moment = new Moment().fromString(isoDate)
  expect(moment.year).toEqual(1972)
  expect(moment.month).toEqual(8)
  expect(moment.dayOfMonth).toEqual(12)
})

test('parse ISO date and time', () => {
  const time = "15:58"
  const isoDate = "1972-08-12"
  const isoDateTime = `${isoDate} ${time}`
  const moment = new Moment().fromString(isoDateTime)
  expect(moment.year).toEqual(1972)
  expect(moment.month).toEqual(8)
  expect(moment.dayOfMonth).toEqual(12)
  expect(moment.hour).toEqual(15)
  expect(moment.minutes).toEqual(58)
})
