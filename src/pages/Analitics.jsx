import React from 'react';
import { Card } from 'antd';
import { TimelineChart } from 'ant-design-pro/lib/Charts';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

class Analitics extends React.Component {
  state = {};

  render() {
    return (
      <Card title="Самые востребованные профессии" bodyStyle={{ paddingTop: 0 }}>
        <TimelineChart
          height={300}
          data={chartData}
          titleMap={{ y1: 'Программист', y2: 'Дизайнер' }}
        />
      </Card>
    );
  }
}

export default Analitics;
