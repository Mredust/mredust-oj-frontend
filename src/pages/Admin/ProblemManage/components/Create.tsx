import {ProForm, ProFormInstance, ProFormList, ProFormRadio, ProFormText} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Card, Col, Flex, Input, InputNumber, InputRef, message, Row, Tag, theme, Tooltip} from 'antd';
import {Editor} from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import '../../../Problem/ProblemDetail/components/md-min.css'
import {addProblemAPI} from "@/services/problem-set/api";

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

  const [timeLimit, setTimeLimit] = useState<number | null>(1000);
  const [memoryLimit, setMemoryLimit] = useState<number | null>(128);
  const [stackLimit, setStackLimit] = useState<number | null>(128);
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
    const params = {
      ...values,
      tags,
      judgeConfig: {
        timeLimit,
        memoryLimit,
        stackLimit,
      }
    } as ProblemAPI.ProblemAddRequest;
    console.log(params);

    const {code, msg} = await addProblemAPI(params)
    if (code === 200) {
      message.success('创建成功！');
    } else {
      message.error(msg)
    }
  }


  const formRef = useRef<
    ProFormInstance<{
      answer: string;
      content: string;
      difficulty: number;
      judgeCase: JudgeCase[];
      judgeConfig: JudgeConfig;
      tags: string[];
      title: string;
    }>
  >();
  type JudgeCase = {
    input: string;
    output: string;
    explain: string;
  };

  type JudgeConfig = {
    memoryLimit: number;
    stackLimit: number;
    timeLimit: number;
  };
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
            <ProForm.Item
              label="测试用例"
              trigger="onValuesChange"
            >
              <ProFormList name="judgeCase" creatorButtonProps={{creatorButtonText: "新增一行测试用例"}}>
                <ProForm.Group>
                  <ProFormText name="input" placeholder={"输入"}/>
                  <ProFormText name="output" placeholder={"输出"}/>
                  <ProFormText name="explain" placeholder={"解释"}/>
                </ProForm.Group>
              </ProFormList>
            </ProForm.Item>

            <ProForm.Item label="时间限制" name="timeLimit">
              <InputNumber addonAfter="ms" value={timeLimit} onChange={(value) => setTimeLimit(value)}/>
            </ProForm.Item>
            <ProForm.Item label="内存限制" name="memoryLimit">
              <InputNumber addonAfter="MB" value={memoryLimit} onChange={(value) => setMemoryLimit(value)}/>
            </ProForm.Item>

            <ProForm.Item label="堆栈限制" name="stackLimit">
              <InputNumber addonAfter="MB" value={stackLimit} onChange={(value) => setStackLimit(value)}/>
            </ProForm.Item>
          </ProForm>
        </Card>
      </Col>
    </Row>
  )
}

export default Create
