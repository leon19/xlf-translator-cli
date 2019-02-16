import {TransUnit} from './types'

/**
 * Format a translation unit adding the target field just after the source field
 * instead of setting it at the end
 */
export default function formatUnit(unit: TransUnit, ...units: Array<Partial<TransUnit>>): TransUnit {
  return Object.assign({source: undefined, target: undefined}, unit, ...units)
}
