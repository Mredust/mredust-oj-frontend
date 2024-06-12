// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** problemSubmit POST /api/problem_submit */
export async function problemSubmitUsingPost(
  body: API.ProblemSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.ProblemSubmit_>('/api/problem_submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
