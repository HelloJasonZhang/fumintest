import request from '@/utils/request'

export function listAudit(query) {
  return request({
    url: '/audit/list',
    method: 'get',
    params: query
  })
}
