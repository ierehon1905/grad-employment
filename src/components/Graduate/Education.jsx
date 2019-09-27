import React from 'react';
import { Card, Divider, Row, Col, Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

class Education extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    const { title, desc } = this.props.data || { title: '', desc: '' };

    return (
      <Card title="Образование">
        <Row gutter={20}>
          <Col span={6}>
            <Avatar size={64} icon="bank" />
          </Col>
          <Col span={18}>
            <Title level={4}>{title}</Title>
            <Text>{desc}</Text>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Education;
