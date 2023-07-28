import { Feature } from '@/src/repository/feature-repository/feature-entity'
import { FeatureRepository } from '@/src/repository/feature-repository/feature-repository'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import { FeatureReq, FeatureReqError, FeatureReqValidator } from '../feature-req'

/*
      @ericchen:
  
      put your explanation here
  */

export const addFeatureFunc = async (
  req: FeatureReq,
  repository: FeatureRepository
): Promise<CommonResponse<FeatureReqError | string>> => {
  const validateRes = await validate(req, FeatureReqValidator)
  if (validateRes.isError) {
    return {
      success: false,
      result: {
        ...validateRes.error,
      },
      message: 'invalidRequest',
      status: 400,
    }
  }
  const entity: Feature = {
    ...new Feature(),
    ...req,
  }

  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
