import { Units } from '../api'

const mround = (num: number, mutliple: number) => Math.round(num / mutliple) * mutliple

export const roundWeight = (weight: number, units: Units) => {
  switch (units) {
    case Units.KG:
      return mround(weight, 2.5)
    case Units.LB:
      return mround(weight, 5)
  }
}
