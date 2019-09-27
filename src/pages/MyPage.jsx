import React from 'react';
import { connect } from 'dva';
import {
  Card,
  PageHeader,
  Icon,
  Row,
  Col,
  Statistic,
  Divider,
  Avatar,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import JobsHistory from '../components/Graduate/JobsHistory';
import Education from '../components/Graduate/Education';
import SmallStats from '../components/Stats/Statistics';

const { Title, Paragraph } = Typography;

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

class Profile extends React.Component {
  state = {
    edit: true,
  };

  componentDidMount() {
    console.log('Grad mounted', Object.keys(this.props.currentGrad));

    if (this.props.dispatch && Object.keys(this.props.currentGrad).length === 0) {
      console.log('Dispatching grad');

      this.props.dispatch({ type: 'grad/fetch' });
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

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

        <Modal
          title="Basic Modal"
          visible={this.state.edit}
          onOk={() => this.setState({ edit: false })}
          onCancel={() => this.setState({ edit: false })}
        >
          <Form layout="vertical">
            <Form.Item label="ФИО">
              <Input defaultValue={name} />
            </Form.Item>
            <Form.Item label="Возраст">
              <InputNumber defaultValue={age} />
            </Form.Item>
            <Form.Item label="Трудоустроен">
              <Input type="checkbox" defaultValue={employed} />
            </Form.Item>
            <Form.Item>
              <Form.Item label="Последняя компания">
                <Input defaultValue={name} />
              </Form.Item>
              <Form.Item label="Даты">
                <DatePicker.RangePicker
                  placeholder={['Start month', 'End month']}
                  format="YYYY-MM"
                  mode={['month', 'month']}
                />
              </Form.Item>
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default connect((global, settings) => ({
  currentGrad: global.grad.currentGrad,
  gradId: settings.location.query.id,
  settings,
}))(Profile);
