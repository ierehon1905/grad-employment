import React from 'react';

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
} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import SmallStats from '../components/Stats/Statistics';

const { Title } = Typography;
const { Search } = Input;

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

  render() {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Title level={3}>Поиск пользователей</Title>
          <Search
            placeholder="Начните вводить имя пользователя"
            enterButton="Найти"
            size="large"
            onSearch={value => console.log(value)}
            style={{ maxWidth: 600 }}
          />
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
          style={{ marginBottom: '1em' }}
        >
          <Menu.Item key="grads">Пользователей</Menu.Item>
          <Menu.Item key="vacancies">Вакансий</Menu.Item>
          <Menu.Item key="employers">Работадателей</Menu.Item>
        </Menu>
        <Form
          layout="inline"
          // style={{
          //   display: 'flex',
          //   alignItems: 'center',
          //   flexWrap: 'wrap',
          //   justifyContent: 'space-between',
          // }}
        >
          <Row gutter={10}>
            <Col span={20}>
              <Form.Item label="Университет">
                <Select mode="multiple" style={{ minWidth: 270 }}>
                  <Select.Option value="china" label="China">
                    <span role="img" aria-label="China">
                      🇨🇳{' '}
                    </span>
                    China (中国)
                  </Select.Option>
                  <Select.Option value="usa" label="USA">
                    <span role="img" aria-label="USA">
                      🇺🇸{' '}
                    </span>
                    USA (美国)
                  </Select.Option>
                  <Select.Option value="japan" label="Japan">
                    <span role="img" aria-label="Japan">
                      🇯🇵{' '}
                    </span>
                    Japan (日本)
                  </Select.Option>
                  <Select.Option value="korea" label="Korea">
                    <span role="img" aria-label="Korea">
                      🇰🇷{' '}
                    </span>
                    Korea (韩国)
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Направление">
                <Select mode="multiple" style={{ minWidth: 270 }}>
                  <Select.Option value="china" label="China">
                    <span role="img" aria-label="China">
                      🇨🇳{' '}
                    </span>
                    China (中国)
                  </Select.Option>
                  <Select.Option value="usa" label="USA">
                    <span role="img" aria-label="USA">
                      🇺🇸{' '}
                    </span>
                    USA (美国)
                  </Select.Option>
                  <Select.Option value="japan" label="Japan">
                    <span role="img" aria-label="Japan">
                      🇯🇵{' '}
                    </span>
                    Japan (日本)
                  </Select.Option>
                  <Select.Option value="korea" label="Korea">
                    <span role="img" aria-label="Korea">
                      🇰🇷{' '}
                    </span>
                    Korea (韩国)
                  </Select.Option>
                </Select>
              </Form.Item>
              <Divider />
              <Form.Item label="Возраст">
                <Slider range defaultValue={[20, 50]} style={{ minWidth: 270 }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button>Применить фильтры</Button>
            </Col>
          </Row>
        </Form>

        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={[1, 2, 3, 4]}
          // grid={{ gutter: 10, column: 1 }}
          renderItem={item => (
            <Card size="small" style={{ marginBottom: 24 }}>
              <List.Item extra={<SmallStats age={20} experience={2} rating={1000} />}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={48}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  }
                  title={<a href="https://ant.design">item.name</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            </Card>
          )}
        />
      </>
    );
  }
}

export default SearchPage;
