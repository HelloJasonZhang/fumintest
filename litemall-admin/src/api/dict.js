import request from '@/utils/request'

export function listDict(query) {
  return request({
    url: '/dict/list',
    method: 'get',
    params: query
  })
}

export function createDict(data) {
  return request({
    url: '/dict/create',
    method: 'post',
    data
  })
}

export function readDict(data) {
  return request({
    url: '/dict/read',
    method: 'get',
    data
  })
}

export function updateDict(data) {
  return request({
    url: '/dict/update',
    method: 'post',
    data
  })
}

export function deleteDict(data) {
  return request({
    url: '/dict/delete',
    method: 'post',
    data
  })
}
