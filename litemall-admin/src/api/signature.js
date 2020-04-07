import request from '@/utils/request'

export function readSignature(query) {
  return request({
    url: '/signature/read',
    method: 'get',
    params: query
  })
}