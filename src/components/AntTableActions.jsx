import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Menu, Dropdown, Popconfirm } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function AntTableActions(props) {
  const { row, handleDelete, id, name, cancel, showFlag, toggle, params } = props;
  const menu = (row) => {
    return (
      <Menu>
       
        <Popconfirm
          title={`Are you sure to delete?`}
          onConfirm={() => (params ? handleDelete(id, params) : handleDelete(id))}
          onCancel={cancel}
          okText="Yes"
          cancelText="No">
          <Menu.Item danger>
            <span>Delete</span>
          </Menu.Item>
        </Popconfirm>
      </Menu>
    );
  };
  return (
    <Dropdown overlay={menu(row)}>
      {showFlag ? (
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Actions <DownOutlined />
        </a>
      ) : (
        <div></div>
      )}
    </Dropdown>
  );
}

export default AntTableActions;
