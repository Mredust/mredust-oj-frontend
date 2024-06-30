import React, {useEffect, useState} from 'react';
import {problemSubmitGetByIdAPI} from "@/services/problem-set/api";
import {Alert, Card, Col, Row, Space} from "antd";
import {useLocation} from "@umijs/max";
import MdEditor from "@/components/MdEditor";


const labelStyle: React.CSSProperties = {
  padding: '0 20px',
  maxHeight: 'calc(100vh - 132px)',
};


const Result: React.FC<any> = () => {
  const location = useLocation(); // 获取location对象
  const urlSearchParams = new URLSearchParams(location.search);
  const submitId = Number(urlSearchParams.get('id')) || -1;
  const [problemSubmitContent, setProblemSubmitContent] = useState<ProblemAPI.ProblemSubmitVO>();
  const reloadData = async () => {
    const {code, data} = await problemSubmitGetByIdAPI({id: submitId})
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
      <Col style={{margin: '20px 0'}}>
        {problemSubmitContent?.status === 3 ? (
          <>
            <Row style={{margin: '20px', width: '100%'}}>
              <Alert
                style={{width: '60%'}}
                message={problemSubmitContent?.message}
                type="success"
                showIcon
              />
            </Row>
            <Row style={{margin: '20px', width: '95%', justifyContent: 'space-between'}}>
              <Card style={{width: '48%', marginRight: 10}}>
                <Space size='small' style={{margin: 10, fontSize: 16}}>
                  时间 {problemSubmitContent?.runTime} ms
                </Space>
              </Card>
              <Card style={{width: '48%', marginLeft: 10}}>
                <Space size='small' style={{margin: 10, fontSize: 16}}>
                  内存消耗 {problemSubmitContent?.runMemory} MB
                </Space>
              </Card>
            </Row>
          </>
        ) : (
          <Row style={{margin: '20px 0'}}>
            <Alert
              style={{width: '60%'}}
              message={problemSubmitContent?.errorMessage ?? problemSubmitContent?.message}
              type="error"
              showIcon
            />
          </Row>)
        }
        <Row style={{margin: '20px'}}>
          <Card
            style={{width: '100%'}}
          >
            <Space size='small' style={{marginBottom: 10}}>
              代码 {problemSubmitContent?.language}
            </Space>
            <MdEditor isEdit={false} value={problemSubmitContent?.code || ''}/>
          </Card>
        </Row>
      </Col>
    </div>
  )
};

export default Result
