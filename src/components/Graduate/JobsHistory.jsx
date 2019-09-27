import React from 'react';
import { Card, Divider, Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const JobRecord = ({ dateSpan, desc }) => (
  <Row gutter={24}>
    <Col span={6} style={{ textAlign: 'center' }}>
      {dateSpan}
    </Col>
    <Col span={18}>
      <Title level={4}>Lorem, ipsum.</Title>
      <Paragraph ellipsis={{ rows: 1, expandable: true }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio consequuntur omnis quo modi
        autem!
      </Paragraph>
      <Title level={4}>Lorem, ipsum.</Title>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio consequuntur omnis quo modi
        autem!
      </Paragraph>
    </Col>
  </Row>
);

class JobsHistory extends React.PureComponent {
  state = {
    records: [],
  };

  componentDidMount() {
    this.setState({ records: this.props.records });
  }

  render() {
    return (
      <Card title="Stats">
        {this.state.records.map((el, i) => (
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
