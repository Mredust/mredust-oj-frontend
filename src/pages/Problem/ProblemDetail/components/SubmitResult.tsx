import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import './md-min.css'
import React, {useEffect, useState} from 'react';
import {problemSubmitGetByIdAPI} from "@/services/problem-set/api";
import {Alert, Card, Col, Row, Space} from "antd";
import {Viewer} from "@bytemd/react";
import {useLocation} from "@umijs/max";

const plugins = [gfm(), highlight()]

const labelStyle: React.CSSProperties = {
  padding: '0 20px',
  maxHeight: 'calc(100vh - 132px)',
  overflow: 'auto',
};


const Result: React.FC<any> = () => {
  const location = useLocation(); // 获取location对象
  const urlSearchParams = new URLSearchParams(location.search);
  const targetSubmitId = Number(urlSearchParams.get('targetSubmitId')) || -1;
  const [problemSubmitContent, setProblemSubmitContent] = useState<ProblemAPI.ProblemSubmitVO>();
  const reloadData = async () => {
    const {code, data} = await problemSubmitGetByIdAPI({id: targetSubmitId})
    if (code === 200) {
      data.code = `\`\`\`\n${data.code}\n\`\`\``;
      setProblemSubmitContent(data)

    }
  }
  //监听路径参数变化
  useEffect(() => {
    reloadData();
  }, [location.search]);

  return (
    <div style={labelStyle}>
      {problemSubmitContent?.status === 3 ? (
        <Col style={{margin: '20px 0'}}>
          <Row style={{margin: '20px', width: '100%'}}>
            <Alert
              style={{width: '60%'}}
              message={problemSubmitContent?.message}
              type="success"
              showIcon
            />
          </Row>
          <Row style={{margin: '20px', width: '100%'}}>
            <Card style={{width: '40%', marginRight: 10}}>
              <Space size='small' style={{marginBottom: 10}}>
                时间 {problemSubmitContent?.runTime} ms
              </Space>
            </Card>
            <Card style={{width: '40%', marginLeft: 10}}>
              <Space size='small' style={{marginBottom: 10}}>
                内存消耗 {problemSubmitContent?.runMemory} KB
              </Space>
            </Card>
          </Row>
        </Col>
      ) : (
        <Row style={{margin: '20px 0'}}>
          <Alert
            style={{width: '60%'}}
            message={problemSubmitContent?.errorMessage}
            type="error"
            showIcon
          />
        </Row>
      )
      }
      <Row style={{margin: '20px 0'}}>
        <Card>
          <Space size='small' style={{marginBottom: 10}}>
            代码 {problemSubmitContent?.language}
          </Space>
          <Viewer
            // @ts-ignore
            value={problemSubmitContent?.code}
            plugins={plugins}
          />
        </Card>
      </Row>
    </div>
  )
};

export default Result
