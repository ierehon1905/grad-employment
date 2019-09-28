import React from 'react';
import { Card, Divider, Row, Col, Typography } from 'antd';
import moment from 'moment';

const { Title, Paragraph } = Typography;
const JobRecord = ({ dateSpan, desc }) => (
  <Row gutter={24}>
    <Col span={6} style={{ textAlign: 'center' }}>
      {moment(String(dateSpan).split('-')[0], 'DD-MM-YYYY').format('MMMM YYYY')}
      <br/>

      ———
      <br/>
      {moment(String(dateSpan).split('-')[1], 'DD-MM-YYYY').format('MMMM YYYY')}
    </Col>
    <Col span={18}>
      <Title level={4}>Lorem, ipsum.</Title>
      <Paragraph ellipsis={{ rows: 1, expandable: true }}>{desc}</Paragraph>
      <Title level={4}>Lorem, ipsum.</Title>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>{desc}s</Paragraph>
    </Col>
  </Row>
);

class JobsHistory extends React.Component {
  state = {};

  render() {
    const records = this.props.records || [];

    return (
      <Card title="Stats">
        {records.map((el, i) => (
          <React.Fragment key={el.dateSpan}>
            {i !== 0 && <Divider />}
            <JobRecord {...el} />
          </React.Fragment>
        ))}
      </Card>
    );
  }
}

export default JobsHistory;
