import * as React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { formItemLayout, tailFormItemLayout } from './styles';

interface IProps {}

interface IState {
  error: Error | null;
  isSubmitting: boolean;
}

interface IFormValues {
  number: string;
  plate: string;
}

class MainForm extends React.Component<IProps & FormComponentProps, IState> {
  static displayName = 'MainForm';

  constructor(props: IProps & FormComponentProps) {
    super(props);
    this.state = {
      error: null,
      isSubmitting: false,
    };
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values: IFormValues) => {
      if (err) {
        console.warn('form submission supressed due to form errors', err);
        return;
      }
      console.info('formValues', values);
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { error, isSubmitting } = this.state;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="License Number">
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: `Please provider your driver's license number`,
              },
            ],
          })(
            <Input
              placeholder="Driver's License Number"
              allowClear={true}
              autoComplete="license-number"
            />,
          )}
        </Form.Item>
        <Form.Item label="License Plate">
          {getFieldDecorator('plate', {
            rules: [
              {
                required: true,
                message: `Please provider your license plate number`,
              },
            ],
          })(
            <Input
              placeholder="License Plate Number"
              allowClear={true}
              autoComplete="license-plate"
            />,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Get Quote
          </Button>
        </Form.Item>
        {error && (
          <Form.Item {...tailFormItemLayout}>
            <Alert
              message="Error Getting Quote"
              description={
                <pre>
                  <code>{error.message || JSON.stringify(error, null, 2)}</code>
                </pre>
              }
            />
          </Form.Item>
        )}
      </Form>
    );
  }
}

const WrappedMainForm = Form.create<FormComponentProps>({ name: 'main' })(MainForm);

export default WrappedMainForm;
