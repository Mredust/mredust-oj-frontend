import {addUserAPI, updateUserAPI} from '@/services/user/api';
import {Form, Input, message, Modal, Radio} from 'antd';
import React, {PropsWithChildren} from 'react';

interface CustomModalProps {
  type: string;
  oldData?: UserAPI.User;
  modalVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}


const CustomModal: React.FC<PropsWithChildren<CustomModalProps>> = (props) => {
  const {type, oldData, modalVisible, onSubmit, onCancel} = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15}
  }
  const onFinish = async (values: UserAPI.UserUpdateRequest | UserAPI.UserAddRequest) => {
    const hide = message.loading('正在处理请求中...');
    const data = {id: oldData?.id, ...values}
    console.log(data)
    const {code, msg} = await (type === 'update'
      ? updateUserAPI(data as UserAPI.UserUpdateRequest)
      : addUserAPI({...values}));
    if (code === 200) {
      hide();
      onSubmit();
      message.success('处理成功');
      return true;
    }
    hide();
    onSubmit();
    message.error('处理失败:' + msg);
    return false;
  };
  return (
    <Modal
      width={600}
      destroyOnClose
      title={type === 'create' ? '新增用户' : '更新用户信息'}
      open={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      okText="提交"
      cancelText="取消"
      okButtonProps={{autoFocus: true, htmlType: 'submit'}}
      modalRender={(dom) => (
        <Form
          layout={'horizontal'}
          form={form}
          onFinish={(values) => onFinish(values)}
          initialValues={type === 'update' ? oldData : {}}
          name="form-data"
          {...formItemLayout}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item<UserAPI.User>
        label="头像"
        name="avatarUrl"
      >
        <Input/>
      </Form.Item>
      <Form.Item<UserAPI.User>
        label="账号"
        name="account"
        rules={[{required: true, message: '请输入账号'}]}
        tooltip="最小为4位"
      >
        <Input placeholder="请输入账号"/>
      </Form.Item>

      <Form.Item<UserAPI.User>
        label="密码"
        name="password"
        rules={[{required: true, message: '请输入密码'}]}
        tooltip="最小为4位"
      >
        <Input.Password placeholder="请输入密码"/>
      </Form.Item>
      <Form.Item<UserAPI.User>
        label="昵称"
        name="username"
      >
        <Input placeholder="请输入昵称"/>
      </Form.Item>

      <Form.Item<UserAPI.User> name="sex" label="性别">
        <Radio.Group defaultValue={2}>
          <Radio value={0}>女</Radio>
          <Radio value={1}>男</Radio>
          <Radio value={2}>未知</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item<UserAPI.User> name="status" label="账号状态">
        <Radio.Group defaultValue={0}>
          <Radio value={0}>正常</Radio>
          <Radio value={1}>封号</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item<UserAPI.User> name="role" label="角色">
        <Radio.Group defaultValue={0}>
          <Radio value={0}>普通用户</Radio>
          <Radio value={1}>管理员</Radio>
        </Radio.Group>
      </Form.Item>
    </Modal>

  );
};

export default CustomModal;
