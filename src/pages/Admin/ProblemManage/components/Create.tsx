import {ProForm, ProFormInstance, ProFormList, ProFormRadio, ProFormText} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Card, Col, Flex, Input, InputNumber, InputRef, message, Row, Tag, theme, Tooltip} from 'antd';
import {Editor} from "@bytemd/react";
import {history} from "@umijs/max";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import '../../../Problem/ProblemDetail/components/md-min.css'
import {addProblemAPI} from "@/services/problem-set/api";
import MonacoEditor from "react-monaco-editor";

const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};

const plugins = [gfm(), highlight()]

const Create: React.FC<any> = () => {
  const [value, setValue] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0);
  const {token} = theme.useToken();

  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const [logHeight, setLogHeight] = useState<string>("100%");
  const [coderHeight, setCoderHeight] = useState<string>('100%');
  const [templateCode, setTemplateCode] = useState<string>('class Solution {\n\n}')
  const [editorLanguage, setEditorLanguage] = useState<string>('java')
  const [runTime, setRunTime] = useState<number | null>(1000);
  const [runMemory, setRunMemory] = useState<number | null>(128);
  const [runStack, setRunStack] = useState<number | null>(128);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
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

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  const handleAddProblem = async (values: ProblemAPI.ProblemAddRequest) => {
    const testCase: string[][] = [];
    const testAnswer: string[] = [];
    const var1: string[] = [];
    const var2: string[] = [];

    if (values.testCase && Array.isArray(values.testCase)) {
      values.testCase.forEach((test: any) => {
        var1.push(test.var1);
        var2.push(test.var2);
        testAnswer.push(test.output);
      });
    }
    // 将 inputs 和 outputs 添加到 testCase 和 testAnswer 中
    testCase.push([...var1]);
    testCase.push([...var2]);

    // 如果 testAnswer 是一个单一的数组，可以直接添加整个 outputs 数组

    const params = {
      ...values,
      tags,
      runTime,
      runMemory,
      runStack,
      testCase,
      testAnswer,
      templateCode
    } as ProblemAPI.ProblemAddRequest;
    const {code, msg} = await addProblemAPI(params)
    if (code === 200) {
      message.success('创建成功！');
      history.push("/admin/problem-manage")
    } else {
      message.error(msg)
    }
  }
  const options: any = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    scrollBeyondLastLine: false,
    scrollbar: {
      // 滚动条
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
  const formRef = useRef<
    ProFormInstance<{
      title: string;
      content: string;
      id: number;
      templateCode: string;
      difficulty: number;
      tags: string[];
      testCase: string[][];
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
            <ProFormText name="title" label="标题" tooltip="最长为 24 位" placeholder="请输入标题"/>
            {/* todo tags是否可以绑定 */}
            <ProForm.Item label="标签" name="tags">
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
                      <span
                        onDoubleClick={(e) => {
                          if (index !== 0) {
                            setEditInputIndex(index);
                            setEditInputValue(tag);
                            e.preventDefault();
                          }
                        }}
                      >
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
                value={value}
                plugins={plugins}
                onChange={(value) => setValue(value)}
              />
            </ProForm.Item>
            <ProForm.Item label="题目模板" name="templateCode" style={{height: 200}}>
              <MonacoEditor
                height={200}
                options={options}
                language={editorLanguage}
                value={templateCode}
                onChange={setTemplateCode}

              />
            </ProForm.Item>
            <ProForm.Item
              label="测试用例"
              trigger="onValuesChange"
            >
              <ProFormList name="testCase" creatorButtonProps={{creatorButtonText: "新增一行测试用例"}}>
                <ProForm.Group>
                  <ProFormText name="var1" placeholder={"参数1"}/>
                  <ProFormText name="var2" placeholder={"参数2"}/>
                  <ProFormText name="output" placeholder={"输出"}/>
                  <ProFormText name="explain" placeholder={"解释"}/>
                </ProForm.Group>
              </ProFormList>
            </ProForm.Item>

            <ProForm.Item label="时间限制" name="runTime">
              <InputNumber addonAfter="ms" value={runTime} onChange={(value) => setRunTime(value)}/>
            </ProForm.Item>
            <ProForm.Item label="内存限制" name="runMemory">
              <InputNumber addonAfter="MB" value={runMemory} onChange={(value) => setRunMemory(value)}/>
            </ProForm.Item>

            <ProForm.Item label="堆栈限制" name="runStack">
              <InputNumber addonAfter="MB" value={runStack} onChange={(value) => setRunStack(value)}/>
            </ProForm.Item>
          </ProForm>
        </Card>
      </Col>
    </Row>
  )
}

export default Create
