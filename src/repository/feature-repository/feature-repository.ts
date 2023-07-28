import { CommonRepository } from 'common-abstract-fares-system'
import { Feature, FeatureSchema } from './feature-entity'

export class FeatureRepository extends CommonRepository<Feature> {
  constructor() {
    super(FeatureSchema, 'features')
  }
}
