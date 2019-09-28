import request from '@/utils/request';

export async function getSuggestions(q) {
  return request('https://honest-bobcat-32.localtunnel.me', { method: 'put', data: { query: q } });
}
