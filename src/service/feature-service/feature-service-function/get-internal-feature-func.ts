import { Feature } from '@/src/repository/feature-repository/feature-entity'
import { FeatureRepository } from '@/src/repository/feature-repository/feature-repository'
import { CommonResponse, validateServiceToken } from 'common-abstract-fares-system'
import mongoose from 'mongoose'

export const getInternalFeatureFunc = async (
  serviceToken: string,
  featureId: string,
  repository: FeatureRepository
): Promise<CommonResponse<Feature | string>> => {
  try {
    const { serviceName } = validateServiceToken(serviceToken.split(' ')[1])
    if (!serviceName) {
      return {
        status: 500,
        message: 'invalid token',
        success: false,
        result: '',
      }
    }
    const serviceAccess = process.env.ACCESS_SCOPE?.split(',')
    if (!serviceAccess?.includes(serviceName)) {
      return {
        status: 500,
        message: 'no access',
        success: false,
        result: '',
      }
    }
  } catch (err) {
    return {
      status: 500,
      message: String(err),
      success: false,
      result: '',
    }
  }
  try {
    const findRoom = await repository.findOne('_id', new mongoose.Types.ObjectId(featureId))
    if (findRoom.error) {
      return {
        status: 401,
        message: String(findRoom.error),
        success: false,
        result: '',
      }
    }
    if (!findRoom.result) {
      return {
        status: 401,
        message: 'invalid category',
        success: false,
        result: '',
      }
    }
    return {
      status: 200,
      success: true,
      message: 'valid',
      result: findRoom.result,
    }
  } catch (err) {
    return {
      status: 401,
      message: String(err),
      success: false,
      result: '',
    }
  }
}
