import request from '@/utils/request';

export async function query(id) {
  const res = await request(
    'http://10.178.192.63:3000/gr/getUser',
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
  const res = await request('http://10.178.192.63:3000/gr/searchUser', {
    method: 'put',
    data: q,
  });
  console.log('Service got ', res);

  return res;
}

export async function subscribe({ id }) {
  const res = await request('http://10.178.192.63:3000/gr/subscribeUser', {
    method: 'put',
    data: { id },
  });
  console.log('Service got ', res);

  return res;
}

export async function offerJobs({ id, jobs }) {
  const res = await request('http://10.178.192.63:3000/gr/offerJobs', {
    method: 'put',
    data: { userId: id, jobs },
  });
  console.log('Service got ', res);

  return res;
}

export async function fetchEdit(data) {
  console.log('Service start ');

  const res = await request('http://10.178.192.63:3000/gr/userEdit', { method: 'put', data });
  console.log('Service got ', res);

  return res;
}
