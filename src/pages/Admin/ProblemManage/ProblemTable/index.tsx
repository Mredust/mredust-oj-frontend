import type {ProFormInstance} from '@ant-design/pro-components';
import {
    FormListActionType,
    ProForm,
    ProFormGroup,
    ProFormList,
    ProFormRadio,
    ProFormText
} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Input, InputNumber, message, Row, Space, Tabs} from 'antd';
import {history, useLocation} from "@umijs/max";
import {addProblemAPI, getProblemLanguageAPI, updateProblemAPI} from "@/services/problem-set/api";
import '@/pages/Admin/ProblemManage/ProblemTable/index.less'
import MdEditor from "@/components/MdEditor";
import CodeEditor from "@/components/CodeEditor";
import ProblemTag from "@/pages/Admin/ProblemManage/ProblemTable/components/ProblemTag";


const Index: React.FC<any> = () => {
    // region 数据定义
    // 加载
    const location = useLocation();
    const [isUpdate, setIsUpdate] = useState<boolean>(true)
    const [oldData, setOldData] = useState<ProblemAPI.ProblemVO>();
    const [isFormInitialized, setIsFormInitialized] = useState(false);
    // 表单数据
    const [tags, setTags] = useState<string[]>([]);
    const [runStack, setRunStack] = useState<number>(1024);
    const [runMemory, setRunMemory] = useState<number>(1024);
    const [runTime, setRunTime] = useState<number>(1000);
    const [difficulty, setDifficulty] = useState<number>(0);
    const [contentValue, setContentValue] = useState<string>('')
    const [languageItems, setLanguageItems] = useState<{
        label: string,
        key: string
    }[]>([])
    const [templateItems, setTemplateItems] = useState<CommonAPI.StringObj>({'java': 'class Solution {\n\n}'})
    const [tabsActiveKey, setTabsActiveKey] = useState<string>('java');
    const [editorLanguage, setEditorLanguage] = useState<string>('java');
    const [editorContent, setEditorContent] = useState<string>('class Solution {\n\n}');
    const [paramCount, setParamCount] = useState(1);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [setParamButtonDisabled, setSetParamButtonDisabled] = useState(false);
    const actionRef = useRef<FormListActionType<{
        [key: string]: string
    }>>();
    const formRef = useRef<ProFormInstance<{
        id: number;
        userId: number;
        title: string;
        content: string;
        templateCode: ProblemAPI.templateCode[];
        difficulty: number;
        tags: string[];
        testCase: string[];
        testAnswer: string[];
        runTime: number;
        runMemory: number;
        runStack: number;
    }>>();
    // endregion


    // region 方法
    const getLanguageList = async () => {
        const {code, data} = await getProblemLanguageAPI();
        if (code === 200 && Array.isArray(data)) {
            setLanguageItems(data.map(item => ({
                label: item.language,
                key: item.value,
            })));
            if (!isUpdate) {
                setTemplateItems(
                    data.reduce((acc: CommonAPI.StringObj, item) => {
                        acc[item.value] = item.code;
                        return acc;
                    }, {})
                );
            }
        }
    }
    const handleTabChange = (key: string) => {
        setTabsActiveKey(key);
        setEditorLanguage(key);
        setEditorContent(templateItems[key]);
    };
    const handleEditorChange = (newCode: string) => {
        setEditorContent(newCode);
    };

    const handleConfirm = () => {
        setAddButtonDisabled(false);
        setSetParamButtonDisabled(true);
        setInputDisabled(true);
    };

    const handleResetParams = () => {
        setParamCount(0);
        setAddButtonDisabled(true);
        setSetParamButtonDisabled(false);
        setInputDisabled(false);
    };

    const handleProblemRequest = async (values: ProblemAPI.ProblemProps) => {
        // 测试用例处理
        const testCase: string[] = [];
        const testAnswer: string[] = [];
        if (values?.testCase) {
            values.testCase.forEach(item => {
                const testCaseItem = [];
                for (let i = 1; i <= paramCount; i++) {
                    if (item.hasOwnProperty(`var${i}`)) {
                        //@ts-ignore
                        testCaseItem.push(item[`var${i}`]);
                    }
                }
                testCase.push(testCaseItem.join(' '));
                //@ts-ignore
                testAnswer.push(item.output);
            });
        }
        // 模板处理
        const templateCode: ProblemAPI.templateCode[] = Object.keys(templateItems).map(key => ({
            language: key,
            value: key,
            code: templateItems[key],
        }));
        let id = oldData?.id;
        const params = {
            ...values,
            id,
            tags,
            testCase,
            testAnswer,
            templateCode
        } as ProblemAPI.ProblemProps;
        console.log("数据参数", params)
        const {code, msg} = isUpdate ? await updateProblemAPI(params) : await addProblemAPI(params)
        if (code === 200) {
            let text = isUpdate ? "更新成功" : "添加成功"
            message.success(text)
            history.push("/admin/problem-manage")
        } else {
            message.error(msg)
        }
    }
    // endregion


    // region 监测
    useEffect(() => {
        getLanguageList();
    }, [])
    useEffect(() => {
        setTemplateItems((prev) => ({
            ...prev,
            [editorLanguage]: editorContent
        }));
    }, [tabsActiveKey, editorLanguage, editorContent]);
    useEffect(() => {
        if (location.state) {
            const newData = location.state as any
            setOldData(newData);
            setIsUpdate(newData.isUpdate ?? true);
        }
    }, [location.state]);

    useEffect(() => {
        if (isUpdate && !isFormInitialized && oldData && formRef?.current) {
            formRef?.current?.setFieldsValue({
                ...oldData
            });
            setDifficulty(oldData.difficulty)
            setContentValue(oldData.content)
            setTags(oldData.tags)
            setRunTime(oldData.runTime)
            setRunMemory(oldData.runMemory)
            setRunStack(oldData.runStack)
            setIsFormInitialized(true);
        }
        if (isUpdate && oldData?.templateCode) {
            const updatedItems: CommonAPI.StringObj = {};
            oldData.templateCode.forEach(item => {
                const {value, code} = item;
                updatedItems[value] = code
            });
            setTemplateItems(updatedItems);
            setEditorContent(templateItems[tabsActiveKey] || '');
        }
        if (isUpdate && oldData?.testCase && oldData?.testCase.length > 0 && actionRef.current) {
            const testCaseList = oldData.testCase;
            const testAnswerList = oldData.testAnswer;
            setParamCount(testCaseList[0].split(' ').length);
            const formattedTestCases = testCaseList.map((testCase) => {
                const values = testCase.split(' ');
                return values.reduce((acc: CommonAPI.StringObj, val, idx) => {
                    acc[`var${idx + 1}`] = val;
                    return acc;
                }, {});
            });
            (testAnswerList as string[]).forEach((item, index) => {
                formattedTestCases[index]['output'] = item;
            });
            let list = actionRef.current.getList();
            // @ts-ignore
            const existingListLength = list.length;
            for (let i = existingListLength - 1; i >= 0; i--) {
                actionRef.current?.remove(i);
            }
            formattedTestCases.forEach((testCase) => {
                actionRef.current?.add(testCase);
            });
        }
    }, [oldData, formRef, isFormInitialized]);

    // endregion
    return (
        <Row style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
            <Col span={20} style={{padding: "0 50px"}}>
                <Card>
                    <ProForm<ProblemAPI.ProblemProps>
                        layout={'horizontal'}
                        formRef={formRef}
                        onFinish={values => handleProblemRequest(values)}
                    >
                        <ProFormText width={'md'} name="title" label="标题名称" placeholder="请输入标题"/>
                        <ProForm.Item label="题目标签" name="tags">
                            <ProblemTag
                                tags={tags}
                                setTags={(value) => setTags(value)}
                            />
                        </ProForm.Item>
                        <ProFormRadio.Group
                            name="difficulty"
                            label="题目难度"
                            radioType="button"
                            fieldProps={{
                                value: difficulty,
                                onChange: (e) => setDifficulty(e.target.value),
                            }}
                            initialValue={difficulty}
                            colProps={{
                                span: 20,
                            }}
                            options={[
                                {
                                    label: '简单',
                                    value: 0,
                                },
                                {
                                    label: '中等',
                                    value: 1,
                                },
                                {
                                    label: '困难',
                                    value: 2,
                                },
                            ]}
                        />
                        <ProForm.Item label="题目描述" name="content">
                            <MdEditor
                                isEdit={true}
                                value={contentValue}
                                onChange={(value) => setContentValue(value)}
                            />
                        </ProForm.Item>
                        <ProForm.Item label="语言模板" name="templateCode">
                            <Tabs
                                onChange={handleTabChange}
                                type="card"
                                size='small'
                                items={languageItems}
                            />
                            <div style={{border: '1px solid #E1E4E8', padding: '10px 0'}}>
                                <CodeEditor
                                    height={200}
                                    language={editorLanguage}
                                    value={editorContent}
                                    onChange={(value) => handleEditorChange(value)}
                                />
                            </div>
                        </ProForm.Item>
                        <ProForm.Item label="测试用例" trigger="onValuesChange">
                            <Space align='start' style={{marginBlockEnd: 24}}>
                                <Input
                                    name="paramCount"
                                    placeholder="请输入形参个数"
                                    value={paramCount}
                                    disabled={inputDisabled}
                                    onChange={(e) => setParamCount(e.target.value ? parseInt(e.target.value) : 0)}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleConfirm}
                                    disabled={setParamButtonDisabled}
                                >
                                    确认形参个数
                                </Button>
                                <Button onClick={handleResetParams}>重置参数</Button>
                                <Button danger>注意：1.需要英文逗号 2.输出的逗号后需要加个空格</Button>
                            </Space>
                            <ProFormList
                                name="testCase"
                                actionRef={actionRef}
                                creatorButtonProps={{
                                    creatorButtonText: '添加测试用例',
                                    disabled: addButtonDisabled
                                }}
                            >
                                <ProFormGroup key="group">
                                    {[...Array(paramCount).keys()].map((index) => (
                                        <ProFormText key={index} name={`var${index + 1}`} placeholder={`形参${index + 1}`}/>
                                    ))}
                                    <ProFormText width={"md"} name="output" placeholder="输出"/>
                                </ProFormGroup>
                            </ProFormList>
                        </ProForm.Item>
                        <ProForm.Item label="时间限制" name="runTime" initialValue={runTime}>
                            <InputNumber addonAfter="ms" placeholder={"请输入时间限制"}/>
                        </ProForm.Item>
                        <ProForm.Item label="内存限制" name="runMemory" initialValue={runMemory}>
                            <InputNumber addonAfter="MB" placeholder={"请输入内存限制"}/>
                        </ProForm.Item>
                        <ProForm.Item label="堆栈限制" name="runStack" initialValue={runStack}>
                            <InputNumber addonAfter="MB" placeholder="请输入堆栈限制"/>
                        </ProForm.Item>
                    </ProForm>
                </Card>
            </Col>
        </Row>
    )
}

export default Index;
