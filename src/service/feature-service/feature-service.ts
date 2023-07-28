import { Feature } from '@/src/repository/feature-repository/feature-entity'
import { FeatureRepository } from '@/src/repository/feature-repository/feature-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { FeatureReq, FeatureReqError } from './feature-req'
import { FeatureRes } from './feature-res'
import {
  addFeatureFunc,
  deleteFeatureFunc,
  getListFeatureFunc,
  updateFeatureFunc,
} from './feature-service-function'
import { getInternalFeatureFunc } from './feature-service-function/get-internal-feature-func'

export class FeatureService extends CommonService<FeatureRepository> {
  constructor() {
    super(new FeatureRepository())
  }

  public async getListFeatures(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<FeatureRes> | string>> {
    return await getListFeatureFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate(req.query, new Feature())
    )
  }

  public async addNewFeature(req: FeatureReq): Promise<CommonResponse<FeatureReqError | string>> {
    return await addFeatureFunc(req, this.repository)
  }

  public async deleteFeature(ids: string): Promise<CommonResponse<string>> {
    return await deleteFeatureFunc(ids, this.repository)
  }

  public async updateFeature(
    id: string,
    req: FeatureReq
  ): Promise<CommonResponse<FeatureReqError | string>> {
    return await updateFeatureFunc(id, this.repository, req)
  }

  public async getInternalFeature(
    id: string,
    serviceToken: string
  ): Promise<CommonResponse<Feature | string>> {
    return await getInternalFeatureFunc(serviceToken, id, this.repository)
  }
}
