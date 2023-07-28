import { IS_REQUIRED, ObjectValidator } from 'common-abstract-fares-system'

export class FeatureReq {
  icon: string = ''

  text: string = ''
}

export const FeatureReqValidator: ObjectValidator<FeatureReq> = {
  icon: IS_REQUIRED,
  text: IS_REQUIRED,
}

export type FeatureReqError = Record<keyof FeatureReq, string>
