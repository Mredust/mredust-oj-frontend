import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row, Skeleton, Space} from "antd";
import Content from "@/pages/Problem/ProblemDetail/components/Content";
import {Color} from "@/utils/colorUtils";
import "./index.less";
import {history} from "@umijs/max";
import Editor from "@/pages/Problem/ProblemDetail/components/Editor";
import {useParams} from "react-router";
import {IconFont} from "@/utils/iconUtil";
import {getProblemByIdAPI} from "@/services/problem-set/api";

const ProblemDetail: React.FC = () => {
  const params = useParams();
  const problemId = Number(params.id);
  const [problem, setProblem] = useState<any>();
  const [difficultyColor, setDifficultyColor] = useState<string>('green');

  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [logHeight, setLogHeight] = useState<string>("calc(100vh - 180px)");
  const [coderHeight, setCoderHeight] = useState<string>('100%');
  const [code, setCode] = useState('public class Main {\n\tpublic static void main(String[] args) {\n\t\t\n\t}\n}')
  const [language, setLanguage] = useState('java')


  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [testResultLoading, setTestResultLoading] = useState<boolean>(false);
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
      } else {
        history.push('/');
      }

    })


  }, [])

  // 左侧内容
  const getLeftContent = () => {
    return (!problem) ?
      <div style={{padding: '0 10px'}}><Skeleton paragraph={{rows: 10}}/></div> :
      <Content problem={problem} difficultyColor={difficultyColor}/>
  }
  // 右侧内容
  const getRightContent = () => {
    return <Editor coderHeight={coderHeight} code={code} setCode={setCode} language={language} setLanguage={setLanguage}/>
  }

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

  //点击运行按钮
  const runProblem = () => {
    alert("运行成功")
    // todo: 调用后端接口
  }

  //点击提交按钮
  const submitProblem = () => {
    if (problem) {
      alert("提交成功")
    }
    // todo: 调用后端接口
  }
  return (
    <Row style={{width: '100%', margin: '0 auto'}}>
      <Col span={12} style={{paddingRight: 5}}>
        <Card>
          题目描述
          <div style={{height: 'calc(100vh - 140px)', borderRadius: 4, overflow: 'auto'}}>
            {getLeftContent()}
          </div>
        </Card>
      </Col>
      <Col span={12} style={{paddingLeft: 5}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '90%'}}>
          <Card bodyStyle={{padding: 0, display: "flex", flexDirection: 'column', height: '100%'}}
                style={{flexGrow: 1, marginBottom: 8, borderRadius: 4}}>
            {getRightContent()}
          </Card>
        </div>
        <div style={{marginTop: 4, height: '10%'}}>
          <Card style={{flexGrow: 1, borderRadius: 4}}>
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
