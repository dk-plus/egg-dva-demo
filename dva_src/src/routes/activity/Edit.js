import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Form, message, Row, Col, Input } from 'antd';
import moment from 'moment';
import { ONLINE_STATUS } from '../../utils/enum';
import { getParentPath } from '../../utils/utils';

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;

    this.loadData(query);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    if (!params.id) {
      return;
    }

    dispatch({
      type: 'template/getDetail',
      payload: { params }
    });
  }

  // 返回上一层
  backToUrl() {
    const { location, dispatch } = this.props;
    let pathname = getParentPath(location);

    dispatch(routerRedux.push({ pathname }));
  }

  // 提交
  handleSubmit = (e) => {
    e && e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFieldsAndScroll((err, formValue) => {
      if (err) {
        message.warn('表单校验不通过');
        return;
      }

      const params = {
        ...formValue,
      }

      dispatch({
        type: 'template/edit',
        payload: { params }
      }).then(res => {
        if (res.returnCode === '0') {
          message.success('保存成功');
          this.backToUrl();
        }
      });
    });
  }

  renderForm() {
    const { template: { detail }, location: { pathname }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title="基本信息">
          <Row gutter={rowGutter}>
            <Col {...colSpan}>
              <Form.Item label="活动ID">
                {getFieldDecorator('id',{
                  initialValue: detail.id,
                })(
                  <Input placeholder="请输入活动ID" allowClear/>
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="活动名称">
                {getFieldDecorator('name',{
                  rules: [{
                    required: true,
                    message: '请输入活动名称',
                  }],
                  initialValue: detail.name,
                })(
                  <Input placeholder="请输入活动名称" allowClear/>
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="活动标题">
                {getFieldDecorator('title',{
                  initialValue: detail.title,
                })(
                  <Input placeholder="请输入活动标题" allowClear/>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Row type="flex" justify="end" style={{marginTop: '20px'}}>
          <Col>
            <Button type="primary" htmlType="submit" loading={editLoading}>提交</Button>
            <Divider type="vertical"/>
            <Button onClick={() => { this.backToUrl() }}>取消</Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  }

  render() {
    const { template: { detail }, location: { pathname }, loading } = this.props;
    return (
      <Card bordered={false} bodyStyle={{padding: 0}} loading={loading}>
        {this.renderForm()}
      </Card>
    )
  }
}

function mapStateToProps({ template, loading }) {
  return {
    template,
    loading: loading.effects['template/getDetail'],
    editLoading: loading.effects['template/edit'],
  }
}

export default Form.create()(connect(mapStateToProps)(ActivityEdit));