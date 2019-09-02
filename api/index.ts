import { NowRequest, NowResponse } from '@now/node'
import { getData } from './data';

export default async (req: NowRequest, res: NowResponse) => {
  const data = await getData()
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=60')
  res.status(200).json(data)
}