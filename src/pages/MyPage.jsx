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


const { Panel } = Collapse;
const { Option } = Select;

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

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

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
    const dispatch = this.props.dispatch;
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

  onSubscribe = () => {
    this.setState({ subscribed: true });
    this.props.dispatch({ type: 'grad/subscribe', payload: { id: this.props.currentGrad.id } })
  }

  onOfferJobs = (jobs) => {
    this.setState({ offerSent: true });
    this.props.dispatch({ type: 'grad/offerJobs', payload: { id: this.props.currentGrad.id, jobs } })
  }

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
      competitionData = [],
      subscribed,
      alert,
      outOfDateAlert,
      email,
      phone,
      factorAlert,
      suggestedPositions = [],
    } = this.props.currentGrad;

    const {
      subscribed: stateSubscribed,
      expandIconPosition,
      offerSent,
    } = this.state;

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
                  <Divider type='vertical' />
                  {phone &&
                    <span styles={{ marginTop: '12px', marginLeft: '12px !important', fontSize: '16px' }}>
                      +7 ({phone[0]}{phone[1]}{phone[2]})  {phone[4]}{phone[5]}{phone[6]} - {phone[7]}{phone[8]} - {phone[9]}{phone[3]}
                    </span>
                  }
                </Paragraph>
                <Paragraph>
                  {!isSubscribed
                    ? (
                      <Tooltip title="Получаейте уведомления о карьерных событиях кандидата">
                        <Button type="primary" onClick={this.onSubscribe}>Отслеживать</Button>
                      </Tooltip>
                    )
                    : "Отслеживается"
                  }
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
            {(suggestedPositions.length > 0 || outOfDateAlert || factorAlert) &&
              <Collapse
                expandIconPosition={"left"}
              >
                {suggestedPositions.length > 0 &&
                  <Panel header="Есть рекомендации по трудоустройству" key="1" extra={genExtra()}>
                    {suggestedPositions.map((position) => (
                      <div key={position}>
                        <b>{position.company_name}</b>
                        <br />
                        {position.speciality} - от {position.max_salary}р.
                                </div>
                    ))}
                    <div style={{ marginTop: '10px' }}>
                      {!offerSent
                        ? (
                          <Button type="primary" onClick={() => this.onOfferJobs(suggestedPositions)}>
                            Отправить рекомендации
                                    </Button>
                        )
                        : <div>Рекомендации отправлены!</div>
                      }
                    </div>
                  </Panel>
                }
                {outOfDateAlert &&
                  <Panel header="Профиль давно не обновлялся!" key="2" extra={genExtra()}>
                    <div>
                      Последнее изменение о работе было более 6 месяцев нащад! Стоит связаться с кандидатом для актуализации информации в профиле
                          </div>
                  </Panel>
                }
                {factorAlert &&
                  <Panel header="Низкое соответствие карьеры и образования!" key="3" extra={genExtra()}>
                    <div>
                      Уровень специализации ниже среднего: {specializationFactor}
                    </div>
                  </Panel>
                }
              </Collapse>
            }

            <br />
            <JobsHistory records={jobsTimeline} />
          </Col>
          <Col span={10}>
            <Education title="Образование" data={educationData} />
            <div style={{ height: 24 }}></div>
            <Education title="Мероприятия и конкурсы" data={competitionData} />
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
