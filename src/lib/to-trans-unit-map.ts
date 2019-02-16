import {TransUnit} from './types'

export default function toTransUnitMap(units: TransUnit[]): Map<string, TransUnit> {
  return units.reduce((map, unit) => map.set(unit._attributes.id, unit), new Map())
}
