import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

class UniSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    // value: [],
    fetching: false,
  };

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('http://10.178.192.63:3000/gr/suggest', {
      method: 'PUT',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filterId: this.props.name, q: value }),
    })
      .then(response => response.json())
      .then(body => {
        if (body.error) throw new Error(JSON.stringify(body.error));
        return body;
      })
      .then(
        body => {
          if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return;
          }
          const data = body.result.map(user => ({
            id: user.id,
            name: user.name,
          }));
          this.setState({ data, fetching: false });
        },
        err => {
          console.log(err);
        },
      );
  };

  handleChange = value => {
    this.setState({
      // value,
      data: [],
      fetching: false,
    });
    console.log('select ', this.props.name, value);
  };

  render() {
    const { fetching, data } = this.state;
    console.log('uni select props', this.props);

    // console.log('uni select', data, value);

    return (
      <Select
        mode="multiple"
        labelInValue
        // defaultValue={[{ key: 122 }]}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
        value={this.props.value}
      >
        {data.map(d => (
          <Option key={d.id}>{d.name}</Option>
        ))}
      </Select>
    );
  }
}

export default UniSelect;
