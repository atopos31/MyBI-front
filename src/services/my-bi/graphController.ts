// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addGraph POST /api/graph/add */
export async function addGraphUsingPost(
  body: API.GraphAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/graph/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** genGraphByAi POST /api/graph/gen */
export async function genGraphByAiUsingPost(
  body: API.GenGraphByAiRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGraph_>('/api/graph/gen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getGraphVOById GET /api/graph/get */
export async function getGraphVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGraphVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGraph_>('/api/graph/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMyGraphVOByPage POST /api/graph/my/list/page */
export async function listMyGraphVoByPageUsingPost(
  body: API.GraphQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageGraph_>('/api/graph/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
