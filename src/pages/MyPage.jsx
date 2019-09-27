import React from 'react';
import { Bar, Gauge, WaterWave } from 'ant-design-pro/lib/Charts';

import { Card, PageHeader, Icon, Row, Col, Statistic, Divider, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import JobsHistory from '../components/Graduate/JobsHistory';
import Education from '../components/Graduate/Education';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const mockRecords = [
  {
    dateSpan: '20.20.2000-21.21.2021',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi.',
  },
  {
    dateSpan: '20.20.2001-21.21.2021',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi.',
  },
  {
    dateSpan: '20.20.2002-21.21.2021',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quasi.',
  },
];

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

export default () => (
  <PageHeaderWrapper
    avatar={{ icon: 'user' }}
    extraContent={
      <>
        Трудоустроен
        <Divider type="vertical" />
        Последнее место работы — Яндекс
      </>
    }
    extra={
      <div style={{ display: 'flex', flexWrap: 'nowraps', alignItems: 'center' }}>
        <Statistic title="Рейтинг" value={56} />

        <Divider type="vertical" style={{ height: '2.3em' }} />

        <Statistic title="Мест работы" value={8} />

        <Divider type="vertical" style={{ height: '2.3em' }} />

        <Statistic title="Рейтинг" value={2223} />
      </div>
    }
  >
    <Row gutter={24}>
      <Col span={14}>
        <JobsHistory records={mockRecords} />
      </Col>
      <Col span={10}>
        <Education />
      </Col>
    </Row>
  </PageHeaderWrapper>
);
