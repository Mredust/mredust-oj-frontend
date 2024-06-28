import React, {useEffect, useState} from "react";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {Color} from "@/utils/colorUtils";
import {getProblemLanguageAPI, getProblemSubmitListAPI, getSubmitStatusAPI} from "@/services/problem-set/api";
import {useLocation} from "@@/exports";
import moment from "moment";
import {IconFont} from "@/utils/iconUtil";
import {Space} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";


const Forum = () => {
    const location = useLocation(); // 获取location对象
    const urlSearchParams = new URLSearchParams(location.search);
    const problemSubmitId = Number(urlSearchParams.get('id')) || -1;
    const [statusList, setStatusList] = useState<Record<string, { text: string }>>({});
    const [languageList, setLanguageList] = useState<Record<string, { text: string }>>({});

    const columns: ProColumns<ProblemAPI.ProblemSubmit>[] = [
        {
            title: '所有状态',
            dataIndex: 'message',
            width: '20%',
            valueType: 'select',
            valueEnum: statusList,
            render: (_, problem) => (
                <div>
                    <div style={{fontSize: 14, color: problem.status === 3 ? Color.EASY : Color.HARD}}>
                        {problem.message}
                    </div>
                    <div style={{fontSize: 12}}>
                        {moment(new Date(problem.createTime).toISOString()).format('YYYY-MM-DD')}
                    </div>
                </div>
            ),
        },
        {
            title: '语言',
            dataIndex: 'language',
            width: '12%',
            valueType: 'select',
            valueEnum: languageList
        },
        {
            title: '执行用时',
            search: false,
            width: '15%',
            dataIndex: 'runTime',
            render: (_, problemSubmit) => (
                <Space direction="horizontal" size="small" style={{display: 'flex'}}>
                    <ClockCircleOutlined/>
                    <div>{problemSubmit.runTime}</div>
                    <div>ms</div>
                </Space>
            )
        },
        {
            title: '消耗内存',
            search: false,
            width: '15%',
            dataIndex: 'runMemory',
            render: (_, problemSubmit) => (
                <Space direction="horizontal" size="small" style={{display: 'flex'}}>
                    <IconFont type='icon-neicun'/>
                    <div>{problemSubmit.runMemory}</div>
                    <div>MB</div>
                </Space>
            )
        },
        {
            title: '备注',
            search: false,
            width: '30%',
        },
    ];
    useEffect(() => {
        const fetchData = async () => {
            const [statusRes, languageRes] = await Promise.all([getSubmitStatusAPI(), getProblemLanguageAPI()]);
            if (statusRes.code === 200 && languageRes.code === 200) {
                const updatedStatusList = statusRes.data.reduce((acc, item) => {
                    // @ts-ignore
                    acc[String(item)] = {text: String(item)};
                    return acc;
                }, {});

                const updatedLanguageList = languageRes.data.reduce((acc, item) => {
                    // @ts-ignore
                    acc[String(item)] = {text: String(item)};
                    return acc;
                }, {});
                setStatusList(updatedStatusList);
                setLanguageList(updatedLanguageList);
            }
        }
        fetchData();
    }, [])
    const getProblemSubmitList = async (params: any) => {
        const requestParams = {
            ...params,
            problemSubmitId,
        }
        const {data, code} = await getProblemSubmitListAPI({...requestParams})
        return {
            data: data.records,
            success: code === 200,
            total: Number(data.total),
        }
    }
    return (
        <div>
            <ProTable<ProblemAPI.ProblemSubmit>
                columns={columns}
                style={{width: '100%', maxWidth: '100%', margin: '0 auto'}}
                request={getProblemSubmitList}
                rowKey="key"
                options={false}
                search={{
                    filterType: 'query',
                }}
                dateFormatter="string"
            />
        </div>

    )
}

export default Forum
