import { Feature } from '@/src/repository/feature-repository/feature-entity'
import { FeatureRepository } from '@/src/repository/feature-repository/feature-repository'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { FeatureReq, FeatureReqError, FeatureReqValidator } from '../feature-req'

export const updateFeatureFunc = async (
  id: string,
  repo: FeatureRepository,
  req: FeatureReq
): Promise<CommonResponse<FeatureReqError | string>> => {
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      status: 400,
      success: true,
      message: 'invalid Id',
      result: '',
    }
  }
  const findId = await repo.findOne('_id', new mongoose.Types.ObjectId(id))
  if (!findId.result) {
    return {
      success: false,
      message: 'not found image',
      result: '',
      status: 404,
    }
  }
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
    ...findId.result,
    ...req,
  }

  const result = await repo.update([entity])
  if (result.error) {
    return {
      status: 500,
      success: false,
      message: String(result.error),
      result: '',
    }
  }
  return {
    status: 200,
    success: true,
    message: 'success',
    result: '',
  }
}
