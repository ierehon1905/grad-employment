import React from 'react';
import { Statistic, Divider } from 'antd';

const SmallStats = ({ age, experience, jobsTimelineLength, rating, minWidth = 400 }) => (
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

    <Statistic
      title="Опыт работы"
      value={
        experience ? `${experience} лет` : jobsTimelineLength ? `${jobsTimelineLength} мест` : 'нет'
      }
      // valueStyle={{ fontSize: '0.9em', lineHeight: '1em' }}
    />

    <Divider type="vertical" style={{ height: '2.3em' }} />

    <Statistic title="Рейтинг" value={rating} precision={2} />
  </div>
);

export default SmallStats;
