import request from '@/utils/request';

export async function query(id) {
  const res = await request(`/api/grads?id=${id || 1}`);
  console.log('Service got ', res);

  return res;
}

export async function search(q) {
  const res = await request('/api/grads/search', { method: 'get', params: { query: q } });
  console.log('Service got ', res);

  return res;
}
