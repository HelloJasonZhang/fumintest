import request from '@/utils/request'

export function listApplicant(query) {
  return request({
    url: '/baReview/list',
    method: 'get',
    params: query
  })
}

export function readApplicant(data) {
  return request({
    url: '/baReview/read?id=' + data.id,
    method: 'get'
  })
}

export function updateApplicant(data) {
  return request({
    url: '/baReview/update',
    method: 'post',
    data
  })
}

export function readApplicantBank(data) {
  return request({
    url: '/baReview/readAudit?id=' + data.id,
    method: 'get'
  })
}

export function createAlicantBank(data) {
  return request({
    url: '/baReview/createAudit',
    method: 'post',
    data
  })
}

export function createFinishAudit(data) {
  return request({
    url: '/baReview/createFinishAudit',
    method: 'post',
    data
  })
}
