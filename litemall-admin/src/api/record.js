import request from '@/utils/request'

export function listRecord(query) {
  return request({
    url: '/record/list',
    method: 'get',
    params: query
  })
}

export function createRecord(data) {
  return request({
    url: '/record/create',
    method: 'post',
    data
  })
}

export function readRecord(data) {
  return request({
    url: '/record/read',
    method: 'get',
    data
  })
}

export function updateRecord(data) {
  return request({
    url: '/record/update',
    method: 'post',
    data
  })
}

export function deleteRecord(data) {
  return request({
    url: '/record/delete',
    method: 'post',
    data
  })
}

export function importData(data) {
  return request({
    url: '/record/importData',
    method: 'post',
    data
  })
}

export function listByIdCardNo(query) {
  console.log(query)
  return request({
    url: '/record/listByIdCardNo',
    method: 'get',
    params: query
  })
}
