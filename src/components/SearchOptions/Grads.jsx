import React from 'react';
import { Form, Select, Divider, Slider, Input, InputNumber, AutoComplete, Spin } from 'antd';
import UniSelect from '../SuggestedSelect/UniSelect';

const { Option } = Select;

class GradsOptions extends React.PureComponent {
  render() {
    const { f } = this.props;

    const { getFieldDecorator, setFieldsValue } = f;

    return (
      <>
        <Form.Item label="Университет">
          {getFieldDecorator('university', {
            rules: [
              {
                transform: el => el || [],
                type: 'array',
              },
            ],
          })(<UniSelect name="university" setFieldsValue={setFieldsValue} />)}
        </Form.Item>
        <Form.Item label="Специальность">
          {getFieldDecorator('speciality', {
            rules: [
              {
                transform: el => el || [],
                type: 'array',
              },
            ],
          })(<UniSelect name="speciality" setFieldsValue={setFieldsValue} />)}
        </Form.Item>
        {/* <Form.Item label="Направление">{getFieldDecorator('university', {
            rules: [
              {
                transform: el => el || [],
                type: 'array',
              },
            ],
          })(<UniSelect setFieldsValue={setFieldsValue} />)}</Form.Item> */}
        <Form.Item label="Участие в конкурсах">
          {getFieldDecorator('competition', {
            rules: [
              {
                transform: el => el || [],
                type: 'array',
              },
            ],
          })(<UniSelect name="competition" setFieldsValue={setFieldsValue} />)}
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
