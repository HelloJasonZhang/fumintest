import request from '@/utils/request'

export function listApplicant(query) {
  return request({
    url: '/assure/list',
    method: 'get',
    params: query
  })
}

export function createApplicant(data) {
  return request({
    url: '/assure/create',
    method: 'post',
    data
  })
}

export function readApplicant(data) {
  return request({
    url: '/assure/read?id=' + data.id,
    method: 'get'
  })
}

export function listBank(data) {
  return request({
    url: '/assure/listBank',
    method: 'get'
  })
}

export function updateApplicant(data) {
  return request({
    url: '/assure/update',
    method: 'post',
    data
  })
}

export function updateByBank(data) {
  return request({
    url: '/assure/updateByBank',
    method: 'post',
    data
  })
}

export function deleteApplicant(data) {
  return request({
    url: '/assure/delete',
    method: 'post',
    data
  })
}

