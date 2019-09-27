import request from '@/utils/request';

export async function query(id) {
  const res = await request(`/api/grads?id=${id || 1}`);
  console.log('Service got ', res);

  return res;
}
