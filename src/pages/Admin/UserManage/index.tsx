import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Divider, Image, message, Popconfirm, Space, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {deleteUserAPI, getUserListByPageAPI} from "@/services/user/api";
import CustomModal from "@/pages/Admin/UserManage/components/CustomModal";
import '@/pages/Admin/UserManage/index.less'

const UserManage: React.FC = () => {
    const [type, setType] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserAPI.User>({} as UserAPI.User);
    const actionRef = useRef<ActionType>();
    const [searchParams, setSearchParams] = useState({} as any);
    const doDelete = async (id: CommonAPI.DeleteRequest) => {
        const hide = message.loading('正在删除');
        if (!id) {
            return;
        }
        const {code, msg} = await deleteUserAPI({...id});
        if (code === 200) {
            message.success(msg);
            actionRef.current?.reload();
        } else {
            message.error(msg);
        }
        hide();
    };

    const getUserList = async (params: any) => {
        const newParams = {
            pageNum: params.current,
            pageSize: params.pageSize,
        }
        const {data, code}: any = await getUserListByPageAPI({...searchParams, ...newParams})
        return {
            data: data.records,
            success: code === 200,
            total: Number(data.total),
        }
    }


    const columns: ProColumns<UserAPI.User>[] = [
        {
            title: '序号',
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '头像',
            search: false,
            dataIndex: 'avatarUrl',
            render: (_, record) => (
                <div>
                    {record.avatarUrl ?
                        (<Image src={record.avatarUrl} width={50} height={50}/>) :
                        (<Image
                            width={50}
                            height={50}
                            src="error"
                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                        />)}
                </div>
            ),
        },
        {
            title: '账号',
            search: false,
            dataIndex: 'account',
            copyable: true,
        },
        {
            title: '密码',
            search: false,
            dataIndex: 'password',
            copyable: true,
        },
        {
            title: '昵称',
            dataIndex: 'username',
            copyable: true,
        },
        {
            title: '性别',
            search: true,
            dataIndex: 'sex',
            valueEnum: {
                0: {text: '女'},
                1: {text: '男'},
                2: {text: '保密'},
            }
        },
        {
            title: '账号状态',
            search: true,
            dataIndex: 'status',
            valueEnum: {
                0: {text: '正常', status: 'Success'},
                1: {text: '封号', status: 'Error'},
            }
        },
        {
            title: '角色',
            search: false,
            dataIndex: 'role',
            valueType: 'select',
            valueEnum: {
                0: {text: '普通用户'},
                1: {text: '管理员'},
            },
        },
        {
            title: '创建时间',
            search: false,
            dataIndex: 'createTime',
            valueType: 'dateTime',
            defaultSortOrder: 'ascend',
        },
        {
            title: '操作',
            valueType: 'option',
            dataIndex: 'option',
            render: (_, record) => (
                <Space split={<Divider type="vertical"/>}>
                    <Typography.Link
                        onClick={() => {
                            setType('update');
                            setUserData(record);
                            setModalVisible(true);
                        }}
                    >
                        编辑
                    </Typography.Link>
                    <Popconfirm
                        title="您确定要删除么？"
                        onConfirm={() => doDelete({id: record.id})}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Typography.Link type="danger">删除</Typography.Link>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div id='user-manage'>
            <ProTable<UserAPI.User>
                columns={columns}
                actionRef={actionRef}
                request={getUserList}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                    filterType: 'query',
                    optionRender: ({searchText, resetText}, {form}) => [
                        <Button
                            key="searchText"
                            type="primary"
                            onClick={() => {
                                const values = form?.getFieldsValue();
                                setSearchParams(values);
                                form?.submit();
                            }}
                        >
                            {searchText}
                        </Button>,
                        <Button
                            key="resetText"
                            onClick={() => {
                                form?.resetFields();
                            }}
                        >
                            {resetText}
                        </Button>
                    ]
                }}
                pagination={{
                    pageSize: 20,
                }}
                dateFormatter="string"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined/>}
                        onClick={() => {
                            setType('create');
                            setModalVisible(true);
                        }}
                        type="primary"
                    >
                        新增
                    </Button>,
                ]}
            />

            <CustomModal
                type={type}
                oldData={userData}
                modalVisible={modalVisible}
                onSubmit={() => {
                    setModalVisible(false);
                    actionRef.current?.reload();
                }}
                onCancel={() => setModalVisible(false)}
            />
        </div>
    );
};

export default UserManage;
