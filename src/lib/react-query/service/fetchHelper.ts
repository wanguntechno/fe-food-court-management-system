/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from 'cookies-next';

import { baseURL } from '@/constant';

interface ResponseWrapper<T> {
  data: T;
  success: boolean;
  message: string;
}

const fetchHelper = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: BodyInit | null | any,
  headers?: Record<string, string>,
) => {
  if (!data && (method === 'POST' || method === 'PUT')) {
    return {
      code: 500,
      error: 'Bad Request',
    } as any;
  }
  const headerInit: Record<string, string> = headers || {};
  let body: BodyInit | null = null;

  if (data instanceof FormData) {
    // If data is FormData, do not set Content-Type; fetch will handle it automatically
    body = data;
  } else {
    // Otherwise, assume data is JSON
    headerInit['Content-Type'] = 'application/json';
    body = JSON.stringify(data);
  }

  const response = await fetch(`${baseURL}${url}`, {
    method,
    body,
    // cache: 'no-store',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: '*/*',
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token') || ''}`,
      ...headerInit,
    },
  });

  if (!response.ok) {
    const result = await response.json();

    throw result;
  }

  return (await response.json()) as ResponseWrapper<T>;
};

export default fetchHelper;
