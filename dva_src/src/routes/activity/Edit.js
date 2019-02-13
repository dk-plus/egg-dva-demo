import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm } from 'antd';
import moment from 'moment';
import { ONLINE_STATUS } from '../../utils/enum';

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/getDetail',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
  }

  // 提交
  handleDelete(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/delete',
      payload: {id},
    });
  }

  renderForm() {
    const { template: { detail }, location: { pathname } } = this.props;
  }

  render() {
    const { template: { detail }, location: { pathname } } = this.props;
    return (
      <Card title="h5编辑">
      </Card>
    )
  }
}

function mapStateToProps({ template }) {
  return {
    template
  }
}

export default connect(mapStateToProps)(ActivityEdit);