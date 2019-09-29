import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import { stringify } from 'querystring';

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
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { current } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {current === 'grads' && <GradsOptions f={this.props.form} />}
        {current === 'vacancies' && <VacanciesOptions f={this.props.form} />}
        {current === 'employers' && <EmployersOptions f={this.props.form} />}
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
    query: null,
    filters: {},
  };

  handleMenuClick = e => {
    // console.log('click ', e);
    window.location.href = `/search/${e.key}`;
    // window.history.pushState(null, null, `/search/${e.key}`);
  };

  fetchSearch = (query, filters) => {
    const { dispatch } = this.props;
    console.log({ query, filters });

    if (dispatch) {
      dispatch({ type: 'grad/search', payload: { q: query, f: filters } });
    }
  };

  handleSearchBtnClick = query => {
    this.setState({ query }, this.fetchSearch(query, this.state.filters));
  };

  handleOptionsSubmit = f => {
    console.log('page recieved ', f);

    this.setState({ filters: f }, this.fetchSearch(this.state.query, f));
  };

  /*
age: 18
firstName: "Леон"
id: 1
lastName: "Минасян"
middleName: null
 */
  render() {
    const results = this.props.searchResults;
    // console.log(this.props);
    const current = this.props.match.params.sub;

    return (
      <Layout>
        <Sider
          theme="light"
          width={300}
          style={{ marginRight: 0, marginLeft: -24, marginTop: -24, padding: 24 }}
        >
          <WrappedSideForm onSubmit={this.handleOptionsSubmit} current={current}></WrappedSideForm>
        </Sider>
        <Content style={{ marginLeft: 0, marginRight: -24, marginTop: -24 }}>
          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'white',
              padding: 18,
              position: 'relative',
            }}
          >
            <Divider
              type="vertical"
              orientation="left"
              style={{ position: 'absolute', height: 'calc(100% + 48px)', left: 0, margin: 0 }}
            />
            <Title level={4}>Поиск пользователей</Title>
            <Search
              placeholder="Начните вводить имя пользователя"
              enterButton="Найти"
              onChange={e => {
                // console.log(e.target.value);
                this.setState({ query: e.target.value });
              }}
              value={this.state.query}
              size="large"
              onSearch={this.handleSearchBtnClick}
              style={{ maxWidth: 600 }}
            />
          </div>
          <Menu
            mode="horizontal"
            selectedKeys={[current]}
            onClick={this.handleMenuClick}
            style={{ marginBottom: 12 }}
          >
            <Menu.Item key="grads">Пользователей</Menu.Item>
            {/* <Menu.Item key="vacancies">Вакансий</Menu.Item>
            <Menu.Item key="employers">Работадателей</Menu.Item> */}
          </Menu>

          <List
            style={{ padding: '0 14px' }}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={results}
            // grid={{ gutter: 10, column: 1 }}
            renderItem={item => (
              <Card size="small" style={{ marginBottom: 12 }} key={item.id}>
                <List.Item
                  extra={
                    <SmallStats
                      minWidth={280}
                      age={item.age}
                      experience={item.experience}
                      rating={item.specializationFactor}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar size={48} src={item.avatar} icon="user" />}
                    title={
                      <Link to={`/users/id/${item.id}`}>
                        {item.lastName} {item.firstName}
                      </Link>
                    }
                    description={
                      item.jobsTimeline.length === 0
                        ? 'Без опыта работы'
                        : item.jobsTimeline[0].company_name
                    }
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
