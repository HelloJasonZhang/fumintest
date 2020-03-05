import request from '@/utils/request'

export function listApplicant(query) {
  return request({
    url: '/ba/list',
    method: 'get',
    params: query
  })
}

export function createApplicant(data) {
  return request({
    url: '/ba/create',
    method: 'post',
    data
  })
}

export function readApplicant(data) {
  return request({
    url: '/ba/read?id=' + data.id,
    method: 'get'
  })
}

export function updateApplicant(data) {
  return request({
    url: '/ba/update',
    method: 'post',
    data
  })
}

export function deleteApplicant(data) {
  return request({
    url: '/ba/delete',
    method: 'post',
    data
  })
}

export function readApplicantBank(data) {
  console.log(data)
  return request({
    url: '/ba/readAudit?id=' + data.id,
    method: 'get'
  })
}

export function createAlicantBank(data) {
  return request({
    url: '/ba/createAudit',
    method: 'post',
    data
  })
}
