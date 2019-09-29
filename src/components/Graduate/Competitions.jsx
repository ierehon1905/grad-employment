import React, { Fragment } from 'react';
import { Card, Divider, Row, Col, Avatar, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

class Competitions extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    const unis = this.props.data || [];
    // const { title, desc } = this.props.data || { title: '', desc: '' };
    // console.log(unis);

    return (
      <Card title={this.props.title}>
        {unis.map((el, i) => (
          <Fragment key={i}>
            {i !== 0 && <Divider />}
            <Row gutter={20}>
              <Col span={6}>
                <Avatar size={64} icon="bank" />
              </Col>
              <Col span={18}>
                <Title level={4}>{el.name}</Title>
                <Text>{el.description}</Text>
              </Col>
            </Row>
            <div style={{ marginTop: 10 }}>
              {el.skillCategories &&
                el.skillCategories.map(t => (
                  <Tag key={t.name} style={{ marginBottom: 8 }}>
                    {t.name}
                  </Tag>
                ))}
            </div>
          </Fragment>
        ))}
      </Card>
    );
  }
}

export default Competitions;
