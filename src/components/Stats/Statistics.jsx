import React from 'react';
import { Statistic, Divider } from 'antd';

const SmallStats = ({ age, experience, rating, minWidth = 400 }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'nowraps',
      alignItems: 'center',
      justifyContent: 'space-around',
      minWidth,
    }}
  >
    <Statistic title="Возраст" value={`${age} лет`} />

    <Divider type="vertical" style={{ height: '2.3em' }} />

    <Statistic title="Опыт работы" value={`${experience} лет`} />

    <Divider type="vertical" style={{ height: '2.3em' }} />

    <Statistic title="Рейтинг" value={rating} />
  </div>
);

export default SmallStats;