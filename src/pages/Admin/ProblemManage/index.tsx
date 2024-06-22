import {PlusOutlined} from '@ant-design/icons';
import type {ProColumns} from '@ant-design/pro-components';
import {ActionType, PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, Divider, message, Popconfirm, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {deleteProblemAPI, getProblemListAPI} from "@/services/problem-set/api";
import {history} from "@umijs/max";
import {Color} from "@/utils/colorUtils";
import {IconFont} from "@/utils/iconUtil";

const ProblemManage: React.FC = () => {
    // 表单配置项
    const [loading, setLoading] = useState<boolean>(true);
    const actionRef = useRef<ActionType>();
    const [searchParams, setSearchParams] = useState({} as any);


    // 方法
    const getProblemList = async (params: any) => {
        setLoading(true);
        const newParams = {
            pageNum: params.current,
            pageSize: params.pageSize,
        }
        const {data, code}: any = await getProblemListAPI({...searchParams, ...newParams})
        setLoading(false);
        return {
            data: data.records,
            success: code === 200,
            total: Number(data.total),
        }
    }

    const handleAdd = () => {
        history.push('/admin/problem-manage/create')
    }
    const handleCheck = (id: number) => {
        history.push(`/problemset/${id}`)
    }
    const handleEdit = (data: ProblemAPI.ProblemVO) => {
        history.push({
            pathname: '/admin/problem-manage/update',
        }, {
            ...data
        })
    }
    const handleDelete = async (id: CommonAPI.DeleteRequest) => {
        const hide = message.loading('正在删除');
        if (!id) {
            return;
        }
        const {code} = await deleteProblemAPI(id)
        if (code === 200) {
            message.success('成功删除!');
            actionRef.current?.reload();
        }
        hide();
    }


    const difficultyMap = {
        0: {
            color: Color.EASY,
            text: '简单',
        },
        1: {
            color: Color.MEDIUM,
            text: '中等',
        },
        2: {
            color: Color.HARD,
            text: '困难',
        }
    };
    const columns: ProColumns<ProblemAPI.ProblemVO>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            align: 'center'
        },
        {
            title: '题目',
            width: '15%',
            dataIndex: 'title',
            ellipsis: true,
        },
        {
            title: '标签',
            ellipsis: true,
            dataIndex: 'tags',
            width: '15%',
            render: (_, record) => {
                return (<Space>{record.tags.map((tag) => (<Tag key={tag}>{tag}</Tag>))}</Space>)
            }
        },
        {
            title: '通过率',
            width: '10%',
            search: false,
            align: 'center',
            render: (dom, record) => {
                return (<>{((record.acceptedNum / record.submitNum || 0) * 100).toFixed(2)}%</>)
            }
        },
        {
            title: '难度',
            width: '10%',
            align: 'center',
            valueType: 'select',
            dataIndex: 'difficulty',
            valueEnum: {
                0: {text: '简单'},
                1: {text: '中等'},
                2: {text: '困难'},
            },
            render: (_, record) => {
                // @ts-ignore
                const {text, color} = difficultyMap[record.difficulty];
                return (<span style={{marginRight: 0, color: color}}>{text}</span>)
            }
        },
        {
            title: '判题配置',
            search: false,
            width: '20%',
            render: (dom, record) => {
                return (
                    <>
                        <Tag icon={<IconFont type='icon-miaobiao'/>}>{record.runTime}ms</Tag>
                        <Tag icon={<IconFont type='icon-neicun'/>}>{record.runMemory}KB</Tag>
                        <Tag icon={<IconFont type='icon-kongjian'/>}>{record.runStack}KB</Tag>
                    </>
                )
            }
        },
        {
            title: '创建时间',
            search: false,
            width: '10%',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            defaultSortOrder: 'ascend',
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            width: '15%',
            align: 'center',
            render: (dom, record) => {
                return (
                    <>
                        <Space split={<Divider type="vertical"/>}>
                            <Typography.Link onClick={() => handleCheck(record.id)}>查看</Typography.Link>
                            <Typography.Link onClick={() => handleEdit(record)}>编辑</Typography.Link>
                            <Popconfirm title="您确定要删除么？" onConfirm={() => handleDelete({id: record.id})} okText="确认" cancelText="取消">
                                <Typography.Link type="danger">删除</Typography.Link>
                            </Popconfirm>
                        </Space>
                    </>
                );
            },
        },
    ];


    return (
        <PageContainer>
            <ProTable<ProblemAPI.ProblemVO>
                columns={columns}
                actionRef={actionRef}
                loading={loading}
                request={getProblemList}
                rowKey="id"
                dateFormatter="string"
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
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined/>} onClick={handleAdd} type="primary">新建题目</Button>
                ]}
            />
        </PageContainer>
    );
};

export default ProblemManage;
