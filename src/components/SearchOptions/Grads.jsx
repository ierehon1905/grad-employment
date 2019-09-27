import React from 'react';
import { Form, Select, Divider, Slider, Input, InputNumber, AutoComplete, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

class GradsOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { f } = this.props;
    console.log(this.props);

    const { getFieldDecorator } = f;
    const { fetching, data, value } = this.state;
    return (
      <>
        <Form.Item label="Университет">
          {getFieldDecorator('uni', {
            rules: [{ type: 'array' }],
          })(
            <Select
              mode="multiple"
              labelInValue
              // value={value}
              placeholder="Select users"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchUser}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {data.map(d => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Специальность">
          {getFieldDecorator('speciality', {
            rules: [{ type: 'array' }],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Направление">{getFieldDecorator('major')(<Input />)}</Form.Item>
        <Form.Item label="Участие в конкурсах">
          {getFieldDecorator('competitions', {
            rules: [{ type: 'array' }],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="red">Red</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="В течении">
          {getFieldDecorator('days-range', { initialValue: 3 })(<InputNumber min={1} max={100} />)}
        </Form.Item>
        <Form.Item label="Возраст">
          {getFieldDecorator('age', { initialValue: [20, 50] })(
            <Slider range style={{ width: '100%' }} />,
          )}
        </Form.Item>
      </>
    );
  }
}

export default GradsOptions;
