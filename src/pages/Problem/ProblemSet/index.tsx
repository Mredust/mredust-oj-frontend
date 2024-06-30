import '@umijs/max';
import React, {useState} from 'react';
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Color} from "@/utils/colorUtils";
import {DifficultyUtils} from "@/utils/DifficultyUtils";
import {history} from "@@/core/history";
import {getProblemVoListAPI} from "@/services/problem-set/api";
import {Card, Col, Row} from "antd";
import '@/pages/Problem/ProblemSet/index.less'
import DataAnalyse from "@/pages/Problem/ProblemSet/components/DataAnalyse";

const ProblemSet: React.FC = () => {
    const [loading] = useState<boolean>(false);
    const clickInspect = (id: number) => {
        history.push(`/problemset/${id}`)
    }
    const getProblemList = async (params: any) => {
        const {data, code} = await getProblemVoListAPI({sortOrder: 'asc', ...params})
        return {
            data: data.records,
            success: code === 200,
            total: Number(data.total),
        }
    }
    const columns: ProColumns<ProblemAPI.ProblemVO>[] = [
        {
            title: '状态',
            dataIndex: 'status',
            align: 'left',
            width: '12%',
            valueType: 'select',
            valueEnum: {
                0: {text: '未开始'},
                2: {text: '尝试过'},
                3: {text: '已解答'},
            },
            render: (_, problem) => (
                <>
                    {
                        problem.status === 3 &&
                        <CheckCircleOutlined style={{fontSize: 18, color: Color.EASY}}/> ||
                        (problem.status === 1 || problem.status === 2) &&
                        <CloseCircleOutlined style={{fontSize: 18, color: Color.MEDIUM}}/>
                    }
                </>
            ),
        },
        {
            title: '编号',
            dataIndex: 'id',
            hidden: true
        },
        {
            title: '题目',
            width: '28%',
            dataIndex: 'title',
            ellipsis: true,
            render: (_, problem) => (
                <>
                    <div className="problem-item" onClick={() => clickInspect(problem.id)}>{`${problem.id}. ${problem.title}`}</div>
                </>
            ),
        },
        {
            title: '题解',
            search: false,
            width: '15%',
            render: () => {
                return <div>0</div>
            }
        },
        {
            title: '通过率',
            width: '15%',
            search: false,
            align: 'center',
            render: (dom, entity) => {
                return <>{((entity.acceptedNum / entity.submitNum || 0) * 100).toFixed(2)}%</>
            }
        },
        {
            title: '难度',
            width: '15%',
            align: 'center',
            valueType: 'select',
            dataIndex: 'difficulty',
            valueEnum: {
                0: {text: '简单'},
                1: {text: '中等'},
                2: {text: '困难'},
            },
            render: (_, record) => {
                const color = DifficultyUtils.getColor(record.difficulty);
                const text = DifficultyUtils.getText(record.difficulty);
                return (<span style={{marginRight: 0, color: color}}>{text}</span>)
            }
        },
        {
            title: '出现频率',
            search: false,
            width: '15%',
        },
    ];


    return (
        <Row style={{width: '78%', margin: '0 auto'}}>
            <Col span={18} style={{paddingRight: 5}}>
                <Card style={{borderRadius: 4}}>
                    <ProTable<ProblemAPI.ProblemVO>
                        loading={loading}
                        columns={columns}
                        request={getProblemList}
                        cardBordered
                        rowKey="id"
                        search={{
                            labelWidth: 'auto',
                            collapsed: false,
                            collapseRender: false,
                        }}
                        options={false}
                        pagination={{
                            showSizeChanger: true,
                        }}
                    />
                </Card>
            </Col>
            <Col span={6} style={{paddingRight: 5}}>
                <DataAnalyse/>
            </Col>
        </Row>
    );
};
export default ProblemSet;
