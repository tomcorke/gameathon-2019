import { NowRequest, NowResponse } from '@now/node'
import { getData } from './data';
import { URL } from 'url';

export default async (req: NowRequest, res: NowResponse) => {
  const data = await getData()
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=60, stale-while-revalidate')
  if (req.headers && req.headers.host) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.host);
  }
  res.json(data);
}