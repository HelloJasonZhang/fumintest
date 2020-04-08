import request from '@/utils/request'

export function listApplicant(query) {
  return request({
    url: '/applicantReview/list',
    method: 'get',
    params: query
  })
}

export function readApplicant(data) {
  return request({
    url: '/applicantReview/read?id=' + data.id,
    method: 'get'
  })
}

export function readBank(data) {
  return request({
    url: '/applicantReview/readBank?bankId=' + data.bankId,
    method: 'get'
  })
}

export function updateApplicant(data) {
  return request({
    url: '/applicantReview/update',
    method: 'post',
    data
  })
}

