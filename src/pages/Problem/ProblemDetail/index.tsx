import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Divider, message, Row, Skeleton, Space, Tabs, TabsProps} from "antd";
import Content from "@/pages/Problem/ProblemDetail/components/Content";
import {Color} from "@/utils/colorUtils";
import "./index.less";
import {history} from "@umijs/max";
import Editor from "@/pages/Problem/ProblemDetail/components/Editor";
import {useParams} from "react-router";
import {IconFont} from "@/utils/iconUtil";
import {getProblemByIdAPI, problemSubmitAPI} from "@/services/problem-set/api";
import {currentUser} from "@/services/ant-design-pro/api";
import {useNavigate} from "umi";
import TextArea from "antd/es/input/TextArea";
import Answer from './components/Answer';
import SubmitResult from "@/pages/Problem/ProblemDetail/components/SubmitResult";

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

const ProblemDetail: React.FC = () => {
  const params = useParams();
  const problemId = Number(params.id);

  const [problem, setProblem] = useState<any>();
  const [difficultyColor, setDifficultyColor] = useState<string>('green');

  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [logHeight, setLogHeight] = useState<string>("calc(100vh - 180px)");
  const [coderHeight, setCoderHeight] = useState<string>('100%');
  const [editorCode, setEditorCode] = useState<string>(' class Solution {\\n}')
  const [editorLanguage, setEditorLanguage] = useState<string>('java')


  //根据id查询题目信息
  useEffect(() => {
    getProblemByIdAPI({id: problemId}).then(res => {
      if (res.code === 200) {
        setProblem(res.data)
        switch (res.data.difficulty) {
          case 0:
            setDifficultyColor(Color.EASY);
            break;
          case 1:
            setDifficultyColor(Color.MEDIUM);
            break;
          case 2:
            setDifficultyColor(Color.HARD);
            break;
        }
        setEditorCode(res.data.templateCode)
      } else {
        history.push('/');
      }

    })


  }, [])


  // 右侧内容
  const getRightContent = () => {
    return <Editor coderHeight={coderHeight} code={editorCode} setCode={setEditorCode} language={editorLanguage} setLanguage={setEditorLanguage}/>
  }
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState<string>(() => {
    return urlSearchParams.get('tab') || 'content';
  });
  const [targetSubmitId, setTargetSubmitId] = useState<number>(() => {
    return Number(urlSearchParams.get('targetSubmitId')) || -1;
  });
  //点击控制台按钮
  const clickTerminal = () => {
    setTerminalOpen(!terminalOpen);
    if (terminalOpen) {
      setCoderHeight('100%')
      setLogHeight('calc(100vh - 170px)')
    } else {
      setCoderHeight('calc(100vh - 322px)')
      setLogHeight('calc(100vh - 322px)')
    }
  }
  //左侧面板标签页
  const [extendTab, setExtendTab] = useState<string>('');
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
      key: 'log',
      label: `提交记录`,
      disabled: !currentUser,
    },
  ]);
  const [activeTerminal, setActiveTerminal] = useState<string>('1');
  const [testInput, setTestInput] = useState<string>('');
  const [testResult, setTestResult] = useState<ProblemAPI.ProblemRunResult>();
  const [testResultLoading, setTestResultLoading] = useState<boolean>(false);
  const terminalItems: TabsProps['items'] = [
    {
      key: '1',
      label: `测试用例`,
    },
    {
      key: '2',
      label: `执行结果`,
    },
  ];
  const getTerminalContent = () => {
    if (activeTerminal === '1') {
      return (
        <>
          <div style={labelStyle}>输入</div>
          <TextArea
            value={testInput}
            onChange={(element) => {
              setTestInput(element.target.value);
            }}
          />
        </>
      );
    } else if (activeTerminal === '2') {
      return testResult ? (
        <>
          <div style={labelStyle}>输入</div>
          <div style={cardStyle}>{testResult.input}</div>
          <div style={{marginTop: 16}}></div>
          <div style={labelStyle}>输出</div>
          <div style={cardStyle}>{testResult.output}</div>
        </>
      ) : testResultLoading ? (
        <Skeleton paragraph={{rows: 4}}></Skeleton>
      ) : (
        <div
          style={{
            color: '#3c3c4399',
            fontWeight: 500,
            justifyContent: 'center',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          请先执行代码
        </div>
      );
    }
  };

  const updateQuery = (newTab: string, submitId: number) => {
    //将搜索参数拼接到query上
    const params = new URLSearchParams({
      tab: newTab,
      targetSubmitId: submitId.toString(),
    });
    navigate({
      search: `?${params.toString()}`,
    });
  };
  const changeTab = (newTab: string) => {
    updateQuery(newTab, targetSubmitId);
  };
  useEffect(() => {
    setActiveTab(urlSearchParams.get('tab') || 'content');
    setTargetSubmitId(Number(urlSearchParams.get('targetSubmitId')) || -1);
  }, [location.search]);
  //点击运行按钮
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
        code: editorCode,
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

  // 左侧内容
  const getLeftContent = () => {
    return (!problem) ?
      (
        <div style={{padding: '0 10px'}}><Skeleton paragraph={{rows: 10}}/></div>) :
      (
        (activeTab === 'content' && (<Content problem={problem} difficultyColor={difficultyColor}/>)) ||
        (activeTab === 'answer' && <Answer answer={""}/>) ||
        (activeTab === 'result' && <SubmitResult/>)
      )
  }
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
          <div style={{height: 'calc(100vh - 140px)', borderRadius: 4, overflow: 'auto'}}>
            {getLeftContent()}
          </div>
        </Card>
      </Col>
      <Col span={12} style={{paddingLeft: 5}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '85%'}}>
          <Card bodyStyle={{padding: 0, display: "flex", flexDirection: 'column', height: '100%'}}
                style={{flexGrow: 1, marginBottom: 8, borderRadius: 4}}>
            {getRightContent()}
          </Card>
          <Card style={{flexGrow: 1, borderRadius: 4}}>
            {terminalOpen && (
              <div style={{position: 'relative', height: 150}}>
                <Tabs
                  style={{padding: '0 16px'}}
                  activeKey={activeTerminal}
                  items={terminalItems}
                  onChange={setActiveTerminal}
                />
                <div style={{maxHeight: 100, overflow: 'scroll'}}>
                  <div style={{margin: '0 20px 10px 20px'}}>{getTerminalContent()}</div>
                </div>

                <Divider style={{position: 'absolute', bottom: 0, margin: 0}}/>
              </div>
            )}
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
          </Card>
        </div>
      </Col>
    </Row>
  );
};
export default ProblemDetail;
