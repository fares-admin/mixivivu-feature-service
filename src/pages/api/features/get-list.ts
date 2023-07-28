import { FeatureService } from '@/src/service/feature-service/feature-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'
import { NextApiRequest, NextApiResponse } from 'next'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new FeatureService()
  const result = await wrapperEndpoint(req, 'GET', service.getListFeatures(req))
  res.status(200).json(result)
}
