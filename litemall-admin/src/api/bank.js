import request from '@/utils/request'

export function listBank(query) {
  return request({
    url: '/bank/list',
    method: 'get',
    params: query
  })
}

export function createBank(data) {
  return request({
    url: '/bank/create',
    method: 'post',
    data
  })
}

export function readBank(data) {
  return request({
    url: '/bank/read',
    method: 'get',
    data
  })
}

export function updateBank(data) {
  return request({
    url: '/bank/update',
    method: 'post',
    data
  })
}

export function deleteBank(data) {
  return request({
    url: '/bank/delete',
    method: 'post',
    data
  })
}
