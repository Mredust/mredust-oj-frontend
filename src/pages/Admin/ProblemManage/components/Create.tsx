import {
    FormListActionType,
    ProForm,
    ProFormGroup,
    ProFormInstance,
    ProFormList,
    ProFormRadio,
    ProFormText
} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Card, Col, Flex, Input, InputNumber, InputRef, message, Row, Space, Tabs, Tag, Tooltip} from 'antd';
import {Editor} from "@bytemd/react";
import {history} from "@umijs/max";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import '../../../Problem/ProblemDetail/components/md-min.css'
import {addProblemAPI} from "@/services/problem-set/api";
import MonacoEditor from "react-monaco-editor";
import './index.less'


const Create: React.FC<any> = () => {

    //扩展
    const plugins = [gfm(), highlight()]
    const options: any = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        scrollBeyondLastLine: false,
        scrollbar: {
            horizontalScrollbarSize: 8,
            verticalScrollbarSize: 8,
        },
        fontSize: 13,
        tabSize: 2,
        minimap: {
            enabled: false
        },
        automaticLayout: true
    };
    // 参数
    const runStackInitialState = 128;
    const runMemoryInitialState = 128;
    const runTimeInitialState = 1024;
    const [difficulty, setDifficulty] = useState<number>(0);
    const [contentValue, setContentValue] = useState<string>('')

    // 标签相关
    const tagPlusStyle: React.CSSProperties = {
        height: 22,
        borderStyle: 'dashed',
    };
    const tagInputStyle: React.CSSProperties = {
        width: 64,
        height: 22,
        marginInlineEnd: 8,
        verticalAlign: 'top',
    };
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const editInputRef = useRef<InputRef>(null);
    const [editInputValue, setEditInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const inputRef = useRef<InputRef>(null);
    const [inputValue, setInputValue] = useState('');
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const showInput = () => {
        setInputVisible(true);
    };

    // 代码模板相关 todo：优化根据后台查询有多少语言
    const languageList = ['java', 'python']
    const [templateCodeList, setTemplateCodeList] = useState<{ [key: string]: string }>({
        'java': 'class Solution {\n\n}',
        'python': 'class Solution:'
    });
    const [activeKey, setActiveKey] = useState<string>(languageList[0] || 'java');
    const [editorLanguage, setEditorLanguage] = useState<string>(languageList[0] || 'java');
    // @ts-ignore
    const [editorContent, setEditorContent] = useState<string>(templateCodeList[[languageList[0] || 'java']]);
    const handleTabChange = (key: string) => {
        setTemplateCodeList((prevTemplateCode) => ({
            ...prevTemplateCode,
            [activeKey]: editorContent,
        }));
        setActiveKey(key);
        setEditorLanguage(key);
        setEditorContent(templateCodeList[key]);
    };

    const handleEditorChange = (newCode: string) => {
        setEditorContent(newCode);
    };

    // 测试用例
    const [paramCount, setParamCount] = useState(1);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [setParamButtonDisabled, setSetParamButtonDisabled] = useState(false);

    const actionRef = useRef<
        FormListActionType<{
            output: string;
            explain: string;
        }>
    >();
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


    const handleAddProblem = async (values: ProblemAPI.ProblemAddRequest) => {
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
        const templateCode: ProblemAPI.templateCode[] = Object.keys(templateCodeList).map(key => ({
            code: templateCodeList[key],
            language: key,
        }));

        const params = {
            ...values,
            tags,
            testCase,
            testAnswer,
            templateCode
        } as ProblemAPI.ProblemAddRequest;
        console.log("数据参数", params)
        const {code, msg} = await addProblemAPI(params)
        if (code === 200) {
            message.success('创建成功！');
            history.push("/admin/problem-manage")
        } else {
            message.error(msg)
        }
    }

    const formRef = useRef<
        ProFormInstance<{
            title: string;
            content: string;
            id: number;
            templateCode: ProblemAPI.templateCode[];
            difficulty: number;
            tags: string[];
            testCase: string[];
            testAnswer: string[];
            runTime: number;
            runMemory: number;
            runStack: number;
            userId: number;
        }>
    >();
    return (
        <Row style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
            <Col span={20} style={{padding: "0 50px"}}>
                <Card>
                    <ProForm<ProblemAPI.ProblemAddRequest>
                        layout={'horizontal'}
                        formRef={formRef}
                        onFinish={values => handleAddProblem(values)}
                    >
                        <ProFormText name="title" label="标题名称" placeholder="请输入标题"/>
                        <ProForm.Item label="题目标签" name="tags">
                            <Flex gap="4px 0" wrap>
                                {tags.map<React.ReactNode>((tag, index) => {
                                    if (editInputIndex === index) {
                                        return (
                                            <Input
                                                ref={editInputRef}
                                                key={tag}
                                                size="small"
                                                style={tagInputStyle}
                                                value={editInputValue}
                                                onChange={handleEditInputChange}
                                                onBlur={handleEditInputConfirm}
                                                onPressEnter={handleEditInputConfirm}
                                            />
                                        );
                                    }
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable={true}
                                            style={{userSelect: 'none'}}
                                            onClose={() => handleClose(tag)}
                                            color={'blue'}
                                        >
                                          <span onDoubleClick={(e) => {
                                              if (index !== 0) {
                                                  setEditInputIndex(index);
                                                  setEditInputValue(tag);
                                                  e.preventDefault();
                                              }
                                          }}>
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                          </span>
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {inputVisible ? (
                                    <Input
                                        ref={inputRef}
                                        type="text"
                                        size="small"
                                        style={tagInputStyle}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConfirm}
                                        onPressEnter={handleInputConfirm}
                                    />
                                ) : (
                                    <Tag style={tagPlusStyle} icon={<PlusOutlined/>} onClick={showInput} color={'blue'}>
                                        添加标签
                                    </Tag>
                                )}
                            </Flex>
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
                            <Editor
                                value={contentValue}
                                plugins={plugins}
                                onChange={(value) => setContentValue(value)}
                            />
                        </ProForm.Item>
                        <ProForm.Item label="语言模板" name="templateCode">
                            <Tabs
                                onChange={handleTabChange}
                                type="card"
                                size='small'
                                items={languageList.map(language => ({
                                    label: language,
                                    key: language,
                                }))}
                            />
                            <div style={{border: '1px solid #E1E4E8', padding: '10px 0'}}>
                                <MonacoEditor
                                    height={200}
                                    width={'100%'}
                                    options={options}
                                    language={editorLanguage}
                                    value={editorContent}
                                    onChange={handleEditorChange}
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
                                    <ProFormText name="output" placeholder="输出"/>
                                </ProFormGroup>
                            </ProFormList>
                        </ProForm.Item>
                        <ProForm.Item label="时间限制" name="runTime" initialValue={runTimeInitialState}>
                            <InputNumber addonAfter="ms" placeholder={"请输入时间限制"}/>
                        </ProForm.Item>
                        <ProForm.Item label="内存限制" name="runMemory" initialValue={runMemoryInitialState}>
                            <InputNumber addonAfter="MB" placeholder={"请输入内存限制"}/>
                        </ProForm.Item>
                        <ProForm.Item label="堆栈限制" name="runStack" initialValue={runStackInitialState}>
                            <InputNumber addonAfter="MB" placeholder="请输入堆栈限制"/>
                        </ProForm.Item>
                    </ProForm>
                </Card>
            </Col>
        </Row>
    )
}

export default Create
