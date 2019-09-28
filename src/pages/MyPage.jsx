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
  Button,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import JobsHistory from '../components/Graduate/JobsHistory';
import Education from '../components/Graduate/Education';
import SmallStats from '../components/Stats/Statistics';
import UniSelect from '../components/SuggestedSelect/UniSelect';
import UserForm from '../components/UserForm';

const { Title, Paragraph } = Typography;

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

class Profile extends React.Component {
  state = {
    edit: false,
  };

  componentDidMount() {
    console.log('Grad mounted', this.props);

    if (
      this.props.dispatch &&
      (Object.keys(this.props.currentGrad).length === 0 ||
        this.props.match.params.id !== this.props.currentGrad.id)
    ) {
      console.log('Dispatching grad');

      this.props.dispatch({ type: 'grad/fetch', payload: this.props.match.params.id });
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleEdit = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props.dispatch;
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);

        return;
      }
      if (dispatch) {
        dispatch({ type: 'grad/editGrad', payload: { ...this.props.currentGrad, ...values } });
      }
      console.log('Received values of form: ', values);

      form.resetFields();
      this.setState({ edit: false });
    });
  };

  render() {
    console.log('logging main props', this.props);
    const {
      firstName = '',
      lastName = '',
      middleName = '',
      age = 0,
      employed = false,
      experience = 0,
      rating = 0,
      jobsTimeline = [],
      educationData = [],
      competitionData = [],
    } = this.props.currentGrad;

    return (
      <PageHeaderWrapper
        content={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Row gutter={20} style={{ width: '100%' }}>
              <Col span={4}>
                <Avatar icon="user" size={80} />
              </Col>
              <Col span={20}>
                <Title style={{ marginBottom: 0 }}>
                  {lastName} {firstName} {middleName}
                </Title>
                <Paragraph>
                  {employed ? 'Трудоустроен' : 'Нетрудоустроен'}
                  <Divider type="vertical" />
                  Последнее место работы —{/* {lastCompany} */}
                </Paragraph>
              </Col>
            </Row>
            <SmallStats age={age} experience={experience} rating={rating} />
          </div>
        }
        extra={<Button shape="circle" icon="edit" onClick={() => this.setState({ edit: true })} />}
      >
        <Row gutter={24}>
          <Col span={14}>
            <JobsHistory records={jobsTimeline} />
          </Col>
          <Col span={10}>
            <Education title="Образование" data={educationData} />
            <div style={{ height: 24 }}></div>
            <Education title="Соревноания" data={competitionData} />
          </Col>
        </Row>

        <Modal visible={this.state.edit}>
          <UserForm
            wrappedComponentRef={this.saveFormRef}
            name={`${lastName} ${firstName} ${middleName}`}
            age={age}
            experience={experience}
            jobHistory={jobsTimeline}
            employed={employed}
            education={educationData}
            onCancel={() => this.setState({ edit: false })}
            onOk={() => this.handleEdit()}
          />
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
