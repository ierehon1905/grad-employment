import React from 'react';

import { Form, Input, InputNumber, DatePicker, Button, Divider } from 'antd';

import UniSelect from '../SuggestedSelect/UniSelect';

class EditForm extends React.Component {
  state = {
    jobHistoryLength: 0,
  };

  componentDidMount() {
    // this.setState({ jobHistoryLength: this.props.jobHistory.length });
  }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <Form layout="vertical">
        <Form.Item label="ФИО">{getFieldDecorator('name')(<Input />)}</Form.Item>
        <Form.Item label="Возраст">{getFieldDecorator('age')(<InputNumber />)}</Form.Item>
        <Form.Item label="Опыт работы">
          {getFieldDecorator('experience')(<InputNumber />)}
        </Form.Item>
        <Form.Item label="Трудоустроен">
          {getFieldDecorator('employed')(<Input type="checkbox" />)}
        </Form.Item>
        <Form.Item label="Образование">
          {getFieldDecorator('university', {
            rules: [{ type: 'array' }],
          })(<UniSelect name="university" setFieldsValue={setFieldsValue} />)}
        </Form.Item>
        <Form.Item label="Места работы">
          {Array(this.state.jobHistoryLength)
            .fill(0)
            .map((el, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <Divider />}
                <Form.Item label="Some job">
                  <Form.Item label="Промежуток">
                    {getFieldDecorator(`jobHistory[${i}].dateSpan`)(<DatePicker.RangePicker />)}
                  </Form.Item>
                  <Form.Item label="Описание должности">
                    {getFieldDecorator(`jobHistory[${i}].desc`, {
                      //   initialValue: el.desc,
                    })(<Input.TextArea />)}
                  </Form.Item>
                </Form.Item>
              </React.Fragment>
            ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              shape="circle"
              icon="plus"
              type="primary"
              onClick={() => {
                console.log('Added job');

                this.setState(prevState => ({
                  jobHistoryLength: prevState.jobHistoryLength + 1,
                }));
              }}
            />
            <Button
              shape="circle"
              icon="cross"
              type="danger"
              onClick={() => {
                console.log('Removed job');
                if (this.state.jobHistoryLength === 0) return;
                this.setState(prevState => ({
                  jobHistoryLength: prevState.jobHistoryLength - 1,
                }));
              }}
            />
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'edit_form' })(EditForm);
