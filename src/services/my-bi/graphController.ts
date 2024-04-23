// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** genGraphByAi POST /api/graph/gen */
export async function genGraphByAiUsingPost(
  body: API.GenGraphByAiRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAIGraphVO_>('/api/graph/gen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
