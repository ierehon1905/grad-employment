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

class EditForm extends React.Component {
  state = {};

  render() {
    const { name, age, employed, experience, jobHistory, education } = this.props;

    return (
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
          <Form.Item label="Опыт работы">
            <InputNumber defaultValue={experience} />
          </Form.Item>
          <Form.Item label="Трудоустроен">
            <Input type="checkbox" defaultValue={employed} />
          </Form.Item>
          <Form.Item label="Образование">
            <Input defaultValue={education} />
          </Form.Item>
          <Form.Item label="Места работы">
            {jobHistory.map(el => (
              <Form.Item label="Some job">
                <Form.Item label="Промежуток">
                  <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item label="Описание должности">
                  <Input.TextArea defaultValue={el.desc} />
                </Form.Item>
              </Form.Item>
            ))}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit_form' })(EditForm);

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Row gutter={20} style={{ width: '100%' }}>
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
            <SmallStats age={age} experience={experience} rating={rating} />
          </div>
        }
      >
        <Row gutter={24}>
          <Col span={14}>
            <JobsHistory records={jobHistory} />
          </Col>
          <Col span={10}>
            <Education data={education} />
          </Col>
        </Row>

        <WrappedEditForm
          name={name}
          age={age}
          experience={experience}
          jobHistory={jobHistory}
          employed={employed}
          education={education}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect((global, settings) => ({
  currentGrad: global.grad.currentGrad,
  gradId: settings.location.query.id,
  settings,
}))(Profile);
