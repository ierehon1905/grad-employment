import React from 'react';
import { Card, Row, Col } from 'antd';
import { TimelineChart, Pie, yuan } from 'ant-design-pro/lib/Charts';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

class Analitics extends React.Component {
  state = {};

  render() {
    return (
      <>
        <Card
          title="Самые востребованные профессии"
          bodyStyle={{ paddingTop: 0 }}
          style={{ marginBottom: 24 }}
        >
          <TimelineChart
            height={300}
            data={chartData}
            titleMap={{ y1: 'Программист', y2: 'Дизайнер' }}
          />
        </Card>
        <Row gutter={24}>
          <Col span={12}>
            <Card>
              <Pie
                hasLegend
                title="销售额"
                subTitle="销售额"
                total={() => (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                    }}
                  />
                )}
                data={salesPieData}
                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                height={294}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Analitics;
