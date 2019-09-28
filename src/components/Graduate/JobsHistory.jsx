import React from 'react';
import { Card, Divider, Row, Col, Typography, Timeline } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
// import 'moment/src/locale/ru';

const { Text, Paragraph } = Typography;
const JobRecord = ({ speciality, company_name, start, end }) => {
  moment.locale('ru');
  const startMoment = moment(start);
  const endMoment = moment(end);
  console.log(moment.locale());

  return (
    <Row gutter={24}>
      <Col
        span={6}
        // style={{ textAlign: 'center' }}
      >
        {startMoment.format('MMMM YYYY')}
        <span style={{ marginLeft: '0.4em' }}>—</span>
        <br />
        {endMoment.format('MMMM YYYY')}
        <br />
        <Text type="secondary">{moment.duration(endMoment.diff(startMoment)).humanize()}</Text>
      </Col>
      <Col span={18}>
        <Text strong>{company_name}</Text>
        <Paragraph ellipsis={{ rows: 1, expandable: true }}>{speciality}</Paragraph>
        <Text strong>Lorem, ipsum.</Text>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{speciality}</Paragraph>
      </Col>
    </Row>
  );
};

class JobsHistory extends React.Component {
  state = {};

  render() {
    const records = this.props.records || [];

    return (
      <Card title="Stats">
        <Timeline>
          {records.map((el, i) => (
            <Timeline.Item key={i} color={i === 0 ? 'blue' : 'gray'}>
              <JobRecord {...el} />
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    );
  }
}

export default JobsHistory;
