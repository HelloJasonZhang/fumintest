import request from '@/utils/request'

export function listApplicant(query) {
  return request({
    url: '/assureReview/list',
    method: 'get',
    params: query
  })
}

export function readApplicant(data) {
  return request({
    url: '/assureReview/read?id=' + data.id,
    method: 'get'
  })
}

export function listBank(data) {
  return request({
    url: '/assureReview/listBank',
    method: 'get'
  })
}

export function updateApplicant(data) {
  return request({
    url: '/assureReview/update',
    method: 'post',
    data
  })
}

export function updateByBank(data) {
  return request({
    url: '/assureReview/updateByBank',
    method: 'post',
    data
  })
}

