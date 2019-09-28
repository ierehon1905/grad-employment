import React from 'react';
import { Card, Divider, Row, Col, Typography, Timeline } from 'antd';
import moment from 'moment';

const { Text, Paragraph } = Typography;
const JobRecord = ({ dateSpan, desc }) => {
  const start = moment(String(dateSpan).split('-')[0], 'DD-MM-YYYY');
  const end = moment(String(dateSpan).split('-')[1], 'DD-MM-YYYY');
  return (
    <Row gutter={24}>
      <Col
        span={6}
        // style={{ textAlign: 'center' }}
      >
        {start.format('MMMM YYYY')}
        <span style={{ marginLeft: '0.4em' }}>—</span>
        <br />
        {end.format('MMMM YYYY')}
        <br />
        <Text type="secondary">{moment.duration(end.diff(start)).humanize()}</Text>
      </Col>
      <Col span={18}>
        <Text strong>Lorem, ipsum.</Text>
        <Paragraph ellipsis={{ rows: 1, expandable: true }}>{desc}</Paragraph>
        <Text strong>Lorem, ipsum.</Text>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{desc}s</Paragraph>
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
            <Timeline.Item key={i}>
              <JobRecord {...el} />
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    );
  }
}

export default JobsHistory;
