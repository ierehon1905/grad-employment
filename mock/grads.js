export default {
  // 支持值为 Object 和 Array
  'GET /api/grads': {
    name: 'Serati Mo',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    employed: false,
    lastCompany: 'Яндекс',
    experience: 1,
    age: 25,
    rating: 2222,
    education: {
      title: 'MISIS',
      desc: 'Прикладная информатика в дизайне Бакалавриат, 2012 — 2016',
    },
    jobHistory: [
      {
        dateSpan: '20.20.2000-21.21.2021',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        dateSpan: '20.20.2001-21.21.2021',
        desc: 'HELLOH ELLOHELL OHELLOHEL LOHELLOHEL LOHELLOH ELLOHELLOHEL LOHELLOHELLO.',
      },
      {
        dateSpan: '20.20.2002-21.21.2021',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi.',
      },
    ],
  },
  'GET /api/grads/search': [
    {
      name: 'Serati Mo',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      employed: false,
      lastCompany: 'Яндекс',
      experience: 1,
      age: 25,
      rating: 2222,
    },
    {
      name: 'Yakob Pupks',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000002',
      employed: false,
      lastCompany: 'Яндекс',
      experience: 4,
      age: 27,
      rating: 2312,
    },
    {
      name: 'Kazus Smill',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000003',
      employed: false,
      lastCompany: 'Яндекс',
      experience: 8,
      age: 29,
      rating: 9844,
    },
  ],
};
