import request from '@/utils/request'

export function listApplicant(query) {
  return request({
    url: '/applicant/list',
    method: 'get',
    params: query
  })
}

export function createApplicant(data) {
  return request({
    url: '/applicant/create',
    method: 'post',
    data
  })
}

export function readApplicant(data) {
  return request({
    url: '/applicant/read?id=' + data.id,
    method: 'get'
  })
}

export function readBank(data) {
  return request({
    url: '/applicant/readBank?bankId=' + data.bankId,
    method: 'get'
  })
}

export function updateApplicant(data) {
  return request({
    url: '/applicant/update',
    method: 'post',
    data
  })
}

export function deleteApplicant(data) {
  return request({
    url: '/applicant/delete',
    method: 'post',
    data
  })
}
