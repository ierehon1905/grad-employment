/* eslint-disable react/no-danger */
import React from 'react';
import { Card, Row, Col, List, Badge, Divider, Statistic } from 'antd';
import { MiniProgress, TimelineChart, Pie, yuan, ChartCard } from 'ant-design-pro/lib/Charts';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  Html,
} from 'bizcharts';
import DataSet from '@antv/data-set';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

// const scale = {
//   value: {
//     alias: 'The Share Price in Dollars',

//   },
//   year: {
//     range: [0, 1],
//   },
// };

class Analitics extends React.Component {
  state = {
    professionsData: [{ x: '1' }],
    professionsLabels: {},
  };

  componentDidMount() {
    const data = {};
    const labels = [];
    const ps = Array(5)
      .fill(0)
      .map((_, i) =>
        fetch('http://10.178.192.63:3000/gr/stats/professions', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ offset: i }),
        })
          .then(res => res.json())
          .then(res => res.result),
      );

    Promise.all(ps).then(res => {
      // console.log(res);

      res.map((mas, y) => {
        // console.log(mas);
        mas.map((rec, i) => {
          if (!data[rec.create_date]) data[rec.create_date] = {};
          data[rec.create_date][`y${y + 1}`] = rec['COUNT(*)'];
          if (i === 0) labels.push(rec.speciality);
        });
      });
      console.log('data ', data, labels);

      const dv = new DataSet.View().source(Object.keys(data).map((k, i) => ({ x: i, ...data[k] })));
      dv.transform({
        type: 'fold',
        fields: ['y1', 'y2', 'y3', 'y4', 'y5'],
        key: 'type',
        value: 'value',
      });
      this.setState({
        professionsLabels: Object.fromEntries(labels.map((l, i) => [`y${i + 1}`, l])),
      });
      this.setState({ professionsData: dv });
    });
  }

  render() {
    console.log(this.state);

    return (
      <PageHeaderWrapper>
        <ChartCard
          title="Самые востребованные профессии"
          // bodyStyle={{ paddingTop: 0 }}

          style={{ marginBottom: 24 }}
        >
          <Chart
            height={467}
            data={this.state.professionsData}
            padding="auto"
            forceFit
            // style={{ height: 467 }}
            // scale={scale}
          >
            <Tooltip crosshairs />
            <Axis />
            <Legend />
            {/* <Geom type="area" position="year*value" color="type" shape="smooth" /> */}
            <Geom type="line" position="x*value" color="type" shape="smooth" size={2} />
          </Chart>
        </ChartCard>
        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <ChartCard>
              {/* <Chart
                height={window.innerHeight}
                // data={dv}
                // scale={cols}
                padding={[80, 100, 80, 80]}
                forceFit
              >
                <Coord type="theta" radius={0.75} innerRadius={0.6} />
                <Axis name="percent" />
                <Legend position="right" offsetY={-window.innerHeight / 2 + 120} offsetX={0} />
                <Tooltip
                  showTitle={false}
                  itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                />
                <Guide>
                  <Html
                    position={['50%', '50%']}
                    html="<div>iiii</div>"
                    alignX="middle"
                    alignY="middle"
                  />
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color="item"
                  tooltip={[
                    'item*percent',
                    (item, percent) => {
                      percent = `${percent * 100}%`;
                      return {
                        name: item,
                        value: percent,
                      };
                    },
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: '#fff',
                  }}
                >
                  <Label
                    content="percent"
                    formatter={(val, item) => `${item.point.item}: ${val}`}
                  />
                </Geom>
              </Chart> */}
            </ChartCard>
          </Col>
          <Col span={12}>
            <ChartCard>
              <List split={false}>
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge
                            count={i + 1}
                            style={{
                              backgroundColor: i < 3 ? '#1890FF' : '#F0F2F5',
                              color: i < 3 ? 'white' : 'black',
                            }}
                          />
                        }
                        title="lorem ipsum!"
                      />
                      <div>{100 - i * 5}%</div>
                    </List.Item>
                  ))}
              </List>
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <ChartCard
              title="Hello"
              total="78%"
              footer={<div>Lorem, ipsum dolor.</div>}
              // contentHeight={500}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>
          <Col span={6}>
            <ChartCard
              title="Hello"
              total="78%"
              footer={
                <>
                  <Divider style={{ margin: '10px 0', height: 1.5 }} />
                  Lorem, ipsum dolor.
                </>
              }
              // contentHeight={500}
            >
              {/* <Statistic value={93} suffix="%" /> */}
              <MiniProgress
                style={{ margin: '0 24px', padding: 10 }}
                percent={78}
                strokeWidth={8}
                target={80}
              />
            </ChartCard>
          </Col>
          <Col span={6}>
            <ChartCard
              title="Hello"
              total="78%"
              footer={<div>Lorem, ipsum dolor.</div>}
              // contentHeight={500}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>
          <Col span={6}>
            <ChartCard
              title="Hello"
              total="78%"
              footer={<div>Lorem, ipsum dolor.</div>}
              // contentHeight={500}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Analitics;
