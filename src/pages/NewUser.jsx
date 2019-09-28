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

class NewUser extends React.Component {
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

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props.dispatch;
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);

        return;
      }
      if (dispatch) {
        dispatch({ type: 'grad/createGrad', payload: { ...this.props.currentGrad, ...values } });
      }
      console.log('Received values of form: ', values);

      form.resetFields();
    });
  };

  render() {
    console.log('logging main props', this.props);

    return (
      <PageHeaderWrapper>
        <Card>
          <UserForm wrappedComponentRef={this.saveFormRef} onOk={() => this.handleCreate()} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect((global, settings) => ({
  currentGrad: global.grad.currentGrad,
  gradId: settings.location.query.id,
  settings,
}))(NewUser);
