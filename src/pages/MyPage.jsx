import React from 'react';
import { Bar, Gauge, WaterWave } from 'ant-design-pro/lib/Charts';
import { connect } from 'dva';
import { Card, PageHeader, Icon, Row, Col, Statistic, Divider, Avatar, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import JobsHistory from '../components/Graduate/JobsHistory';
import Education from '../components/Graduate/Education';
import SmallStats from '../components/Stats/Statistics';

const { Title, Paragraph } = Typography;
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

class Profile extends React.Component {
  componentDidMount() {
    console.log('Grad mounted', Object.keys(this.props.currentGrad));

    if (this.props.dispatch && Object.keys(this.props.currentGrad).length === 0) {
      console.log('Dispatching grad');

      this.props.dispatch({ type: 'grad/fetch' });
    }
  }

  render() {
    console.log('logging main props', this.props);
    const {
      name = '',
      age = 0,
      employed = false,
      lastCompany = '',
      experience = 0,
      rating = 0,
      jobHistory = [],
      education = {},
    } = this.props.currentGrad;
    console.log('JobHistory', education);

    return (
      <PageHeaderWrapper
        content={
          <>
            <Row gutter={20}>
              <Col span={4}>
                <Avatar icon="user" size={80} />
              </Col>
              <Col span={20}>
                <Title style={{ marginBottom: 0 }}>{name}</Title>
                <Paragraph>
                  {employed ? 'Трудоустроен' : 'Нетрудоустроен'}
                  <Divider type="vertical" />
                  Последнее место работы — {lastCompany}
                </Paragraph>
              </Col>
            </Row>
          </>
        }
        extra={<SmallStats age={age} experience={experience} rating={rating} />}
        // extra={

        // }
      >
        <Row gutter={24}>
          <Col span={14}>
            <JobsHistory records={jobHistory} />
          </Col>
          <Col span={10}>
            <Education data={education} />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect((global, settings) => ({
  currentGrad: global.grad.currentGrad,
  gradId: settings.location.query.id,
  settings,
}))(Profile);
