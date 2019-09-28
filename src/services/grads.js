import request from '@/utils/request';

export async function query(id) {
  const res = await request(
    'http://10.178.192.59:3000/gr/getUser',
    // '/api/grads',
    {
      method: 'put',
      data: { id },
    },
  );
  console.log('Service got ', res);

  return res;
}

export async function search(q) {
  const res = await request('http://10.178.192.59:3000/gr/searchUser', {
    method: 'put',
    data: q,
  });
  console.log('Service got ', res);

  return res;
}

export async function edit(data) {
  const res = await request('http://10.178.192.59:3000/gr/editUser', { method: 'put', data });
  console.log('Service got ', res);

  return res;
}
