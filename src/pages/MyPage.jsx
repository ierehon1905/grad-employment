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

const { Title, Paragraph } = Typography;

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

class EditForm extends React.Component {
  state = {
    jobHistoryLength: 0,
  };

  componentDidMount() {
    this.setState({ jobHistoryLength: this.props.jobHistory.length });
  }

  render() {
    const {
      visible,
      name,
      age,
      employed,
      experience,
      jobHistory,
      education,
      onCancel,
      onOk,
    } = this.props;

    const { getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <Modal title="Edit" visible={visible} onOk={onOk} onCancel={onCancel}>
        <Form layout="vertical">
          <Form.Item label="ФИО">
            {getFieldDecorator('name', { initialValue: name })(<Input />)}
          </Form.Item>
          <Form.Item label="Возраст">
            {getFieldDecorator('age', { initialValue: age })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="Опыт работы">
            {getFieldDecorator('experience', { initialValue: experience })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="Трудоустроен">
            {getFieldDecorator('employed', { initialValue: employed })(<Input type="checkbox" />)}
          </Form.Item>
          <Form.Item label="Образование">
            {getFieldDecorator('university', {
              initialValue: [{ key: 'foo', desc: 'bar' }],
              rules: [{ type: 'array' }],
            })(<UniSelect name="university" setFieldsValue={setFieldsValue} />)}
          </Form.Item>
          <Form.Item label="Места работы">
            {Array(this.state.jobHistoryLength)
              .fill(0)
              .map((el, i) => (
                <React.Fragment key={i}>
                  {i !== 0 && <Divider />}
                  <Form.Item label="Some job">
                    <Form.Item label="Промежуток">
                      {getFieldDecorator(`jobHistory[${i}].dateSpan`)(<DatePicker.RangePicker />)}
                    </Form.Item>
                    <Form.Item label="Описание должности">
                      {getFieldDecorator(`jobHistory[${i}].desc`, {
                        //   initialValue: el.desc,
                      })(<Input.TextArea />)}
                    </Form.Item>
                  </Form.Item>
                </React.Fragment>
              ))}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                shape="circle"
                icon="plus"
                type="primary"
                onClick={() => {
                  console.log('Added job');

                  this.setState(prevState => ({
                    jobHistoryLength: prevState.jobHistoryLength + 1,
                  }));
                }}
              />
              <Button
                shape="circle"
                icon="cross"
                type="danger"
                onClick={() => {
                  console.log('Removed job');
                  if (this.state.jobHistoryLength === 0) return;
                  this.setState(prevState => ({
                    jobHistoryLength: prevState.jobHistoryLength - 1,
                  }));
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit_form' })(EditForm);

class Profile extends React.Component {
  state = {
    edit: false,
  };

  componentDidMount() {
    console.log('Grad mounted', this.props);

    if (this.props.dispatch && Object.keys(this.props.currentGrad).length === 0) {
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
      name = '',
      age = 0,
      employed = false,
      lastCompany = '',
      experience = 0,
      rating = 0,
      jobHistory = [],
      education = [],
      competitions = [],
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
        extra={<Button shape="circle" icon="edit" onClick={() => this.setState({ edit: true })} />}
      >
        <Row gutter={24}>
          <Col span={14}>
            <JobsHistory records={jobHistory} />
          </Col>
          <Col span={10}>
            <Education title="Образование" data={education} />
            <div style={{ height: 24 }}></div>
            <Education title="Соревноания" data={competitions} />
          </Col>
        </Row>

        <WrappedEditForm
          wrappedComponentRef={this.saveFormRef}
          name={name}
          age={age}
          experience={experience}
          jobHistory={jobHistory}
          employed={employed}
          education={education}
          visible={this.state.edit}
          onCancel={() => this.setState({ edit: false })}
          onOk={() => this.handleEdit()}
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
