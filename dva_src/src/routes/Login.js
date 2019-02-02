import React from 'react';
import { connect } from 'dva';
import { Card, Input, Icon, Row, Col, Button, Form, Layout } from 'antd';

const Password = Input.Password;
const FormItem = Form.Item;
const { Content } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e && e.preventDefault();

    const { form, dispatch } = this.props;

    form.validateFields((err, fieldValue) => {
      if (err) return;

      console.log(fieldValue);

      dispatch({
        type: 'user/login',
        payload: fieldValue,
      }).then(res => {
        console.log('res', res);
        if (res.code === 200) {
          window.location.href = '/home';
        }
      });
    });
  }

  render() {
    const rowGutter = { xs: 8, sm: 16, md: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8 };
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout style={{height: '100%'}}>
        <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Card title="登录">
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
              {
                getFieldDecorator('user', {
                  rules: [{
                    required: true,
                    message: '请输入账号',
                  }]
                })(
                  <Input placeholder="请输入账号" addonBefore={<Icon type="user"/>}/>
                )
              }
              </FormItem>
              <FormItem>
              {
                getFieldDecorator('pwd', {
                  rules: [{
                    required: true,
                    message: '请输入密码',
                  }]
                })(
                  <Password placeholder="请输入密码" addonBefore={<Icon type="lock"/>}/>
                )
              }
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
              </FormItem>
            </Form>
          </Card>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  }
}

export default Form.create()(connect(mapStateToProps)(Login));
