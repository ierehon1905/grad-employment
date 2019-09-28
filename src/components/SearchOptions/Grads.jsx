import React from 'react';
import { Form, Select, Divider, Slider, Input, InputNumber, AutoComplete, Spin } from 'antd';
import UniSelect from '../UniSelect';

const { Option } = Select;

class GradsOptions extends React.PureComponent {
  render() {
    const { f } = this.props;

    const { getFieldDecorator, setFieldsValue } = f;

    return (
      <>
        <Form.Item label="Университет">
          {getFieldDecorator('uni', {
            rules: [
              {
                transform: el => el || [],
                type: 'array',
              },
            ],
          })(<UniSelect setFieldsValue={setFieldsValue} />)}
        </Form.Item>
        <Form.Item label="Специальность">
          {getFieldDecorator('speciality', {})(
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
