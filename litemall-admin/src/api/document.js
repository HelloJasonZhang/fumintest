import request from '@/utils/request'

export function listDocument(query) {
  return request({
    url: '/document/list',
    method: 'get',
    params: query
  })
}

export function createDocument(data) {
  return request({
    url: '/document/create',
    method: 'post',
    data
  })
}

export function readDocument(query) {
  return request({
    url: '/document/read',
    method: 'get',
    params: query
  })
}

export function updateDocument(data) {
  return request({
    url: '/document/update',
    method: 'post',
    data
  })
}

export function deleteDocument(data) {
  return request({
    url: '/document/delete',
    method: 'post',
    data
  })
}

export function batchDeleteDocument(data) {
  return request({
    url: '/document/batch-delete',
    method: 'post',
    data
  })
}
