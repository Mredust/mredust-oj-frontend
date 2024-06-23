import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Divider, message, Row, Skeleton, Space, Tabs, TabsProps} from "antd";
import Content from "@/pages/Problem/ProblemDetail/components/Content";
import "./index.less";
import {history} from "@umijs/max";
import {useParams} from "react-router";
import {getProblemByIdAPI, problemSubmitAPI} from "@/services/problem-set/api";
import {currentUser} from "@/services/ant-design-pro/api";
import {useNavigate} from "umi";
import Forum from './components/Forum';
import SubmitResult from "@/pages/Problem/ProblemDetail/components/SubmitResult";
import SubmitRecord from "@/pages/Problem/ProblemDetail/components/SubmitRecord";
import Editor from "@/pages/Problem/ProblemDetail/components/Editor";
import {IconFont} from "@/utils/iconUtil";

const ProblemDetail: React.FC = () => {
    // 加载
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(location.search);
    const params = useParams();
    const problemId = Number(params.id);
    const [problem, setProblem] = useState<any>();

    //左侧面板
    const [activeTab, setActiveTab] = useState<string>('content');
    const [extendTab, setExtendTab] = useState<string>('');
    const [id, setId] = useState<number>(() => Number(urlSearchParams.get('id')) || -1);
    const [problemItems, setProblemItems] = useState<TabsProps['items']>([
        {
            key: 'content',
            label: `题目描述`,
        },
        {
            key: 'answer',
            label: `题解`,
        },
        {
            key: 'record',
            label: `提交记录`,
            disabled: !currentUser,
        },
    ]);
    const updateQuery = (newTab: string, submitId: number) => {
        const params = new URLSearchParams({
            tab: newTab,
            id: submitId.toString(),
        });
        navigate({
            search: `?${params.toString()}`,
        });
    };
    const changeTab = (newTab: string) => {
        updateQuery(newTab, id);
    };
    useEffect(() => {
        setActiveTab(urlSearchParams.get('tab') || 'content');
        setId(Number(urlSearchParams.get('id')) || -1);
    }, [location.search]);
    const getLeftContent = () => {
        return (!problem) ?
            (
                <div style={{padding: '0 10px'}}><Skeleton paragraph={{rows: 10}}/></div>) :
            (
                (activeTab === 'content' && (<Content problem={problem}/>)) ||
                (activeTab === 'answer' && (<Forum answer={""}/>)) ||
                (activeTab === 'record' && (<SubmitRecord/>)) ||
                (activeTab === 'result' && (<SubmitResult/>))
            )
    }


    //右侧面板
    const languageList = ['java', 'python']
    const [templateCodeList, setTemplateCodeList] = useState<{ [key: string]: string }>({
        'java': 'class Solution {\n\n}',
        'python': 'class Solution:'
    });
    const initialLanguage = languageList[0] || 'java';
    const initialTemplateCode = templateCodeList[initialLanguage] || '';
    const [editorLanguage, setEditorLanguage] = useState<string>(initialLanguage);
    const [editorCodeValue, setEditorCodeValue] = useState<string>(initialTemplateCode)
    const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
    const [codeHeight, setCodeHeight] = useState<string>('90%');
    const [activeTerminal, setActiveTerminal] = useState<string>('testCase');
    const [testResult, setTestResult] = useState<ProblemAPI.ProblemRunResult>();
    const [testResultLoading, setTestResultLoading] = useState<boolean>(false);
    const terminalItems: TabsProps['items'] = [
        {
            key: 'testCase',
            label: `测试用例`,
        },
        {
            key: 'executeResult',
            label: `执行结果`,
        },
    ];
    const labelStyle: React.CSSProperties = {
        color: '#3c3c4399',
        fontSize: '.75rem',
        fontWeight: 500,
        marginBottom: 8,
    };
    const cardStyle: React.CSSProperties = {
        borderRadius: '.5rem',
        backgroundColor: '#000a2008',
        padding: '6px 10px',
    };
    const clickTerminal = () => {
        setTerminalOpen(!terminalOpen);
        if (terminalOpen) {
            setCodeHeight('90%')
        } else {
            setCodeHeight('35%')
        }
    }

    // todo 完善
    const getTerminalContent = () => {
        if (activeTerminal === 'testCase') {
            return (
                <div style={{
                    height: '100%',
                    color: '#3c3c4399',
                    fontWeight: 500,
                    overflow: 'auto'
                }}>
                    <div style={labelStyle}>输入</div>
                </div>
            );
        } else if (activeTerminal === 'executeResult') {
            return testResult ? (
                <div style={{
                    height: '100%',
                    color: '#3c3c4399',
                    fontWeight: 500,
                    overflow: 'auto'
                }}>
                    <div style={labelStyle}>输入</div>
                    <div style={cardStyle}>{testResult.input}</div>
                    <div style={{marginTop: 16}}></div>
                    <div style={labelStyle}>输出</div>
                    <div style={cardStyle}>{testResult.output}</div>
                </div>
            ) : (testResultLoading ? (
                <Skeleton paragraph={{rows: 4}}></Skeleton>
            ) : (
                <div style={{
                    height: '100%',
                    color: '#3c3c4399',
                    fontWeight: 500,
                    overflow: 'auto'
                }}>
                    请先执行代码
                </div>
            ))
        }
    };


    //todo 点击运行按钮
    const runProblem = () => {
        setTestResultLoading(true);
        const res = {
            code: 200,
            data: {
                code: 0,
                input: "1",
                output: "2"
            },
            msg: "运行成功"
        }
        if (res.code === 200) {
            message.success('运行成功！');
            setActiveTerminal('2');
            setTestResult(res.data);
            setTestResultLoading(false);
        }
    }

    //点击提交按钮
    const submitProblem = async () => {
        if (problem) {
            const params = {
                code: editorCodeValue,
                language: editorLanguage.toString(),
                problemId: problem.id
            } as ProblemAPI.ProblemSubmitAddRequest
            const {code, data} = await problemSubmitAPI(params)
            if (code === 200) {
                const newTag = {
                    key: 'result',
                    label: data?.message || "结果",
                };
                setProblemItems((prevItems) => {
                    //@ts-ignore
                    const newItems = prevItems.map(item =>
                        item.key === newTag.key ? newTag : item
                    );
                    if (!newItems.some(item => item.key === newTag.key)) {
                        newItems.push(newTag);
                    }

                    return newItems;
                });
                setExtendTab(data?.message || "结果");
                updateQuery('result', data.id);
            } else {
                message.error("提交失败");
            }
        }
    }
    useEffect(() => {
        getProblemByIdAPI({id: problemId}).then(res => {
            if (res.code === 200) {
                setProblem(res.data)
                res.data.templateCode.forEach(item => {
                    const {language, code} = item;
                    if (language && code) {
                        setTemplateCodeList(prev => ({
                            ...prev,
                            [language]: code
                        }));
                    }
                });
            } else {
                history.push('/');
            }
        })
    }, [])
    useEffect(() => {
        setEditorCodeValue(templateCodeList[editorLanguage] || '')
    }, [templateCodeList, editorLanguage]);
    return (
        <Row style={{width: '100%', margin: '0 auto'}}>
            <Col span={12} style={{paddingRight: 5}}>
                <Card>
                    <Tabs
                        style={{padding: '0 10px'}}
                        activeKey={activeTab}
                        items={problemItems}
                        onChange={changeTab}
                    />
                    <div style={{
                        height: 'calc(100vh - 160px)',
                        borderRadius: 4,
                        overflow: 'auto'
                    }}>
                        {getLeftContent()}
                    </div>
                </Card>
            </Col>
            <Col span={12} style={{paddingLeft: 5}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 73px)',
                }}>
                    <Card
                        bodyStyle={{padding: 0, display: 'flex', flexDirection: 'column', height: '99%'}}
                        style={{
                            flexGrow: 1,
                            marginBottom: 8,
                            borderRadius: 4,
                            height: codeHeight,
                            boxSizing: 'border-box',
                        }}
                    >
                        <Editor
                            code={editorCodeValue}
                            setCode={setEditorCodeValue}
                            language={editorLanguage}
                            setLanguage={setEditorLanguage}
                        />
                    </Card>
                    <Card
                        bodyStyle={{padding: 0, display: 'flex', flexDirection: 'column', height: '99%'}}
                        style={{flexGrow: 1, borderRadius: 4, overflow: 'auto'}}>
                        {terminalOpen && (
                            <div style={{position: 'relative', height: '100%'}}>
                                <Tabs
                                    style={{padding: '0 16px'}}
                                    activeKey={activeTerminal}
                                    items={terminalItems}
                                    onChange={setActiveTerminal}
                                />
                                <div style={{}}>
                                    <div style={{margin: '0 20px 10px 20px'}}>{getTerminalContent()}</div>
                                </div>
                                <Divider style={{position: 'absolute', bottom: 0, margin: 0}}/>
                            </div>
                        )}
                        <div style={{padding: 15}}>
                            <Button onClick={clickTerminal} type='text' size='small' style={{width: 90, height: 28}}>
                                控制台 {terminalOpen ? <IconFont type='icon-down'/> : <IconFont type='icon-up'/>}
                            </Button>
                            <Space style={{float: 'right'}}>
                                {/* todo：判断用户是否登录在去提交代码 */}
                                <Button
                                    size='small'
                                    style={{width: 66, height: 28}}
                                    onClick={runProblem}>
                                    运行
                                </Button>
                                <Button
                                    onClick={submitProblem}
                                    size='small'
                                    style={{width: 66, height: 28}}
                                    type='primary'>
                                    提交
                                </Button>
                            </Space>
                        </div>

                    </Card>
                </div>
            </Col>
        </Row>
    );
};
export default ProblemDetail;
