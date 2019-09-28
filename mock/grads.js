export default {
  // 支持值为 Object 和 Array
  'PUT /api/grads': {
    result: [
      {
        name: 'Serati Mo',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        employed: false,
        lastCompany: 'Яндекс',
        experience: 1,
        age: 25,
        rating: 2222,
        education: [
          {
            title: 'MISIS',
            desc: 'Прикладная информатика в дизайне Бакалавриат, 2012 — 2016',
            tags: [
              'IT',
              'Enginiring',
              'Physics',
              'Computer Science',
              'Neural Pissins',
              'Astrinomy',
              'Mathematics',
            ],
          },
          {
            title: 'MIPT',
            desc: 'Прикладная информатика в дизайне Бакалавриат, 2012 — 2016',
            tags: ['Neural Pissins', 'Astrinomy', 'Mathematics'],
          },
        ],
        competitions: [
          {
            title: 'JuniorSkills',
            tags: [
              'IT',
              'Enginiring',
              'Physics',
              'Computer Science',
              'Neural Pissins',
              'Astrinomy',
              'Mathematics',
            ],
          },
          {
            title: 'WorldSkills',
            tags: ['Neural Pissins', 'Astrinomy', 'Mathematics'],
          },
        ],
        jobHistory: [
          {
            dateSpan: '20.10.2000-21.11.2021',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            dateSpan: '20.10.2001-21.11.2021',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi.',
          },
          {
            dateSpan: '20.10.2002-21.11.2021',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi.',
          },
        ],
      },
    ],
  },
  'PUT /api/grads/search': [
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
