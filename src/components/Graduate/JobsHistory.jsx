import React from 'react';
import { Card, Divider, Row, Col } from 'antd';

const JobRecord = ({ dateSpan, desc }) => (
  <Row gutter={24}>
    <Col span={6}>{dateSpan}</Col>
    <Col span={18}>{desc}</Col>
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
