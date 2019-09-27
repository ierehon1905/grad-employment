import React from 'react';
import { Card, Divider, Row, Col, Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

class Education extends React.PureComponent {
  state = {
    records: {},
  };

  componentDidMount() {
    this.setState({ records: this.props.records });
  }

  render() {
    return (
      <Card title="Образование">
        <Row gutter={20}>
          <Col span={6}>
            <Avatar size={64} icon="bank" />
          </Col>
          <Col span={18}>
            <Title level={4}>НИТУ "МИСиС"</Title>
            <Text>Прикладная информатика в дизайне Бакалавриат, 2012 — 2016</Text>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Education;
