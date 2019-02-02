import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Button } from 'antd';

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
    });
  }

  handleDelete(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/delete',
      payload: {id},
    });
  }

  render() {
    const { products: { goods } } = this.props;
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '操作',
      render: (val, record) => {
        return <Button onClick={() => {this.handleDelete(record.id)}}>删除</Button>
      }
    }];
    return (
      <Card title="products">
        <Table
          columns={columns}
          dataSource={goods}
          rowKey={record => record.id}
        />
      </Card>
    )
  }
}

function mapStateToProps({ products }) {
  return {
    products
  }
}

export default connect(mapStateToProps)(Products);