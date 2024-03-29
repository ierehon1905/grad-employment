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
  Collapse,
  Select,
  Tooltip,
} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import JobsHistory from '../components/Graduate/JobsHistory';
import Education from '../components/Graduate/Education';
import Competitions from '../components/Graduate/Competitions';

import SmallStats from '../components/Stats/Statistics';
import UniSelect from '../components/SuggestedSelect/UniSelect';
import UserForm from '../components/UserForm';

const { Panel } = Collapse;
const { Option } = Select;

const { Title, Paragraph } = Typography;

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
};

class Profile extends React.Component {
  state = {
    edit: false,
    subscribed: false,
    expandIconPosition: 'left',
    offerSent: false,
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

  onPositionChange = expandIconPosition => {
    this.setState({ expandIconPosition });
  };

  handleEdit = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);

        return;
      }

      if (dispatch) {
        console.log('dispatching edit');

        dispatch({
          type: 'grad/edit',
          payload: {
            user: {
              ...this.props.currentGrad,
              ...values,
              educationData: !values.educationData
                ? []
                : values.educationData.map(d => ({
                    ...d,
                    university_name: d.university[0].label,
                    // id: Number(d.university[0].key) || 0,
                    speciality_name: d.speciality[0].label,
                  })),
            },
          },
        });
      }
      console.log('Received values of form: ', values);

      // form.resetFields();
      // this.setState({ edit: false });
    });
  };

  onSubscribe = () => {
    this.setState({ subscribed: true });
    this.props.dispatch({ type: 'grad/subscribe', payload: { id: this.props.currentGrad.id } });
  };

  onOfferJobs = jobs => {
    this.setState({ offerSent: true });
    this.props.dispatch({
      type: 'grad/offerJobs',
      payload: { id: this.props.currentGrad.id, jobs },
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
      specializationFactor,
      jobsTimeline = [],
      educationData = [],
      competitionsData = [],
      subscribed,
      alert,
      outOfDateAlert,
      email,
      phone,
      factorAlert,
      suggestedPositions = [],
    } = this.props.currentGrad;

    const { subscribed: stateSubscribed, expandIconPosition, offerSent } = this.state;

    const isSubscribed = subscribed || stateSubscribed;

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
                  <span styles={{ marginTop: '12px', marginBottom: '12px', fontSize: '16px' }}>
                    {email}
                  </span>
                  <Divider type="vertical" />
                  {phone && (
                    <span
                      styles={{
                        marginTop: '12px',
                        marginLeft: '12px !important',
                        fontSize: '16px',
                      }}
                    >
                      +7 ({phone[0]}
                      {phone[1]}
                      {phone[2]}) {phone[4]}
                      {phone[5]}
                      {phone[6]} - {phone[7]}
                      {phone[8]} - {phone[9]}
                      {phone[3]}
                    </span>
                  )}
                </Paragraph>
                <Paragraph>
                  {!isSubscribed ? (
                    <Tooltip title="Получаейте уведомления о карьерных событиях кандидата">
                      <Button type="primary" onClick={this.onSubscribe}>
                        Отслеживать
                      </Button>
                    </Tooltip>
                  ) : (
                    'Отслеживается'
                  )}
                </Paragraph>
              </Col>
            </Row>
            <SmallStats age={age} experience={experience} rating={specializationFactor} />
          </div>
        }
        extra={<Button shape="circle" icon="edit" onClick={() => this.setState({ edit: true })} />}
      >
        <Row gutter={24}>
          <Col span={14}>
            {(suggestedPositions.length > 0 || outOfDateAlert || factorAlert) && (
              <Collapse expandIconPosition="left">
                {suggestedPositions.length > 0 && (
                  <Panel header="Есть рекомендации по трудоустройству" key="1">
                    {suggestedPositions.map(position => (
                      <div key={position.id}>
                        <b>{position.company_name}</b>
                        <br />
                        {position.speciality}
                      </div>
                    ))}
                    <div style={{ marginTop: '10px' }}>
                      {!offerSent ? (
                        <Button type="primary" onClick={() => this.onOfferJobs(suggestedPositions)}>
                          Отправить рекомендации
                        </Button>
                      ) : (
                        <div>Рекомендации отправлены!</div>
                      )}
                    </div>
                  </Panel>
                )}
                {outOfDateAlert && (
                  <Panel header="Профиль давно не обновлялся!" key="2">
                    <div>
                      Последнее изменение о работе было более 6 месяцев нащад! Стоит связаться с
                      кандидатом для актуализации информации в профиле
                    </div>
                  </Panel>
                )}
                {factorAlert && (
                  <Panel header="Низкое соответствие карьеры и образования!" key="3">
                    <div>Уровень специализации ниже среднего: {specializationFactor}</div>
                  </Panel>
                )}
              </Collapse>
            )}

            <br />
            <JobsHistory records={jobsTimeline} />
          </Col>
          <Col span={10}>
            <Education title="Образование" data={educationData} />
            <div style={{ height: 24 }}></div>
            <Competitions title="Мероприятия и конкурсы" data={competitionsData} />
          </Col>
        </Row>

        <Modal
          visible={this.state.edit}
          onCancel={() => this.setState({ edit: false })}
          onOk={() => this.handleEdit()}
        >
          <UserForm wrappedComponentRef={this.saveFormRef} grad={this.props.currentGrad} />
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
