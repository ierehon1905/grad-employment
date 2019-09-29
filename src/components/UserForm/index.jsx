import React from 'react';

import { Form, Input, InputNumber, DatePicker, Button, Divider, Row, Col } from 'antd';

import UniSelect from '../SuggestedSelect/UniSelect';

class EditForm extends React.Component {
  state = {
    jobHistoryLength: 0,
    jobHistorySpans: {},
    educationDataLength: 0,
  };

  componentDidMount() {
    this.setState(
      {
        jobHistoryLength: this.props.grad.jobsTimeline.length,
        educationDataLength: this.props.grad.educationData.length,
      },
      () =>
        this.props.form.setFieldsValue({
          ...this.props.grad,
          educationData: this.props.grad.educationData.map((u, i) => ({
            ...u,
            university: [{ key: u.id, label: u.university_name }],
            speciality: [{ key: i, label: u.speciality_name }],
          })),
        }),
    );
    console.log('edit form ', this.props);
  }

  render() {
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form;

    return (
      <Form layout="vertical">
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Фамилия">{getFieldDecorator('lastName')(<Input />)}</Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Имя">{getFieldDecorator('firstName')(<Input />)}</Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Отчество">{getFieldDecorator('middleName')(<Input />)}</Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Возраст">
              {getFieldDecorator('age')(<InputNumber width="100%" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Почта">{getFieldDecorator('email')(<Input />)}</Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Телефон">{getFieldDecorator('phone')(<Input />)}</Form.Item>
          </Col>
        </Row>

        {/* <Form.Item label="Опыт работы">
          {getFieldDecorator('experience')(<InputNumber />)}
        </Form.Item> */}
        {/* <Form.Item label="Трудоустроен">
          {getFieldDecorator('employed')(<Input type="checkbox" />)}
        </Form.Item> */}
        {/* <Form.Item label="Образование">
          {getFieldDecorator('university', {
            rules: [
              {
                type: 'array',
                //  initialValue: [{ key: 1, label: 'foo' }],
                // valuePropName: 'value'
              },
            ],
          })(<UniSelect name="university" setFieldsValue={setFieldsValue} />)}
        </Form.Item> */}
        <Form.Item label="Образование">
          {Array(this.state.educationDataLength)
            .fill(0)
            .map((el, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <Divider />}

                <Row gutter={10}>
                  <Col span={10}>
                    <Form.Item label="Учреждение">
                      {getFieldDecorator(`educationData[${i}].university`, {
                        rules: [
                          {
                            type: 'array',
                            // max: 1,
                          },
                        ],
                        initialValue:
                          this.props.grad.educationData.length > i
                            ? [
                                {
                                  key: this.props.grad.educationData[i].id,
                                  label: this.props.grad.educationData[i].university_name,
                                },
                              ]
                            : [],
                      })(<UniSelect name="university" />)}
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item label="Лет">
                      {getFieldDecorator(`educationData[${i}].duration_years`)(<InputNumber />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Специальность">
                  {getFieldDecorator(`educationData[${i}].speciality`, {
                    rules: [
                      {
                        type: 'array',
                        //  initialValue: [{ key: 1, label: 'foo' }],
                        // valuePropName: 'value'
                      },
                    ],
                  })(<UniSelect name="speciality" />)}
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
                  educationDataLength: prevState.educationDataLength + 1,
                }));
              }}
            />
            <Button
              shape="circle"
              icon="close"
              type="danger"
              onClick={() => {
                console.log('Removed job');
                if (this.state.educationDataLength === 0) return;
                this.setState(prevState => ({
                  educationDataLength: prevState.educationDataLength - 1,
                }));
              }}
            />
          </div>
        </Form.Item>

        <Divider />
        <Form.Item label="Места работы">
          {Array(this.state.jobHistoryLength)
            .fill(0)
            .map((el, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <Divider />}

                <Row gutter={10}>
                  <Col span={10}>
                    <Form.Item label="Компания">
                      {getFieldDecorator(`jobsTimeline[${i}].company_name`)(<Input />)}
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item label="Промежуток">
                      {getFieldDecorator(`jobsTimeline[${i}].dateSpan`)(
                        <DatePicker.RangePicker
                          format="MM-YYYY"
                          placeholder={['Start month', 'End month']}
                          mode={['month', 'month']}
                          // value={this.state.jobHistorySpans[i]}
                          onChange={v => {
                            console.log(v);
                            setFieldsValue({ [`jobsTimeline[${i}].dateSpan`]: v });
                          }}
                          onPanelChange={(value, mode) => {
                            setFieldsValue({ [`jobsTimeline[${i}].dateSpan`]: value });
                          }}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Form.Item label="Описание должности">
                  {getFieldDecorator(`jobsTimeline[${i}].desc`, {
                    //   initialValue: el.desc,
                  })(<Input.TextArea />)}
                </Form.Item> */}
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
              icon="close"
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
