import request from '@/utils/request';

export async function query(id) {
  const res = await request('/api/grads', { method: 'put', data: { id } });
  console.log('Service got ', res);

  return res;
}

export async function search(q) {
  const res = await request('/api/grads/search', { method: 'put', data: { query: q } });
  console.log('Service got ', res);

  return res;
}

export async function edit(data) {
  const res = await request('/api/grads/edit', { method: 'put', data });
  console.log('Service got ', res);

  return res;
}
