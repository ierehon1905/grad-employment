import React from 'react';
import { connect } from 'dva';

import {
  Menu,
  Typography,
  Input,
  Form,
  Select,
  Divider,
  Button,
  Row,
  Col,
  Slider,
  List,
  Avatar,
  Card,
  Layout,
} from 'antd';

import SmallStats from '../components/Stats/Statistics';

import GradsOptions from '../components/SearchOptions/Grads';
import VacanciesOptions from '../components/SearchOptions/Vacancies';
import EmployersOptions from '../components/SearchOptions/Employers';

const { Sider, Content } = Layout;

const { Title } = Typography;
const { Search } = Input;

class SideForm extends React.Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { current } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {current === 'grads' && <GradsOptions getFieldDecorator={getFieldDecorator} />}
        {current === 'vacancies' && <VacanciesOptions getFieldDecorator={getFieldDecorator} />}
        {current === 'employers' && <EmployersOptions getFieldDecorator={getFieldDecorator} />}
        <Form.Item>
          <Button style={{ width: '100%' }} htmlType="submit">
            Применить фильтры
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedSideForm = Form.create({ name: 'options' })(SideForm);

class SearchPage extends React.Component {
  state = {
    current: 'grads',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  handleSearch = v => {
    const { dispatch } = this.props;
    console.log('SOSISISOSISOSISOS');

    if (dispatch) {
      dispatch({ type: 'grad/search', payload: v });
    }
  };

  render() {
    const results = this.props.searchResults;
    console.log(results);

    return (
      <Layout>
        <Sider theme="light" style={{ marginRight: 24, padding: 12 }}>
          <WrappedSideForm
            onSubmit={this.handleOptionsSubmit}
            current={this.state.current}
          ></WrappedSideForm>
        </Sider>
        <Content>
          <div style={{ textAlign: 'center', backgroundColor: 'white', padding: 18 }}>
            <Title level={4}>Поиск пользователей</Title>
            <Search
              placeholder="Начните вводить имя пользователя"
              enterButton="Найти"
              size="large"
              onSearch={this.handleSearch}
              style={{ maxWidth: 600 }}
            />
          </div>
          <Menu
            mode="horizontal"
            selectedKeys={[this.state.current]}
            onClick={this.handleClick}
            style={{ marginBottom: 12 }}
          >
            <Menu.Item key="grads">Пользователей</Menu.Item>
            <Menu.Item key="vacancies">Вакансий</Menu.Item>
            <Menu.Item key="employers">Работадателей</Menu.Item>
          </Menu>

          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={results}
            // grid={{ gutter: 10, column: 1 }}
            renderItem={item => (
              <Card size="small" style={{ marginBottom: 12 }}>
                <List.Item
                  extra={
                    <SmallStats
                      minWidth={280}
                      age={item.age}
                      experience={item.experience}
                      rating={item.rating}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar size={48} src={item.avatar} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              </Card>
            )}
          />
        </Content>
      </Layout>
    );
  }
}

export default connect((global, settings) => ({
  searchResults: global.grad.searchResults,
  settings,
}))(SearchPage);
