import React from 'react';
import { Form, Select, Divider, Slider } from 'antd';

const GradsOptions = () => (
  <>
    <Form.Item label="Компания">
      <Select mode="multiple" style={{ width: '100%' }}>
        <Select.Option value="china" label="China">
          <span role="img" aria-label="China">
            🇨🇳{' '}
          </span>
          China (中国)
        </Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Направление">
      <Select mode="multiple" style={{ width: '100%' }}>
        <Select.Option value="china" label="China">
          <span role="img" aria-label="China">
            🇨🇳{' '}
          </span>
          China (中国)
        </Select.Option>
      </Select>
    </Form.Item>
    <Divider />
    <Form.Item label="Возраст">
      <Slider range defaultValue={[20, 50]} style={{ width: '100%' }} />
    </Form.Item>
  </>
);

export default GradsOptions;
