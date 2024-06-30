import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import {Color} from "@/utils/colorUtils";
import {Pie} from '@ant-design/plots';
import {getProblemDataAnalysisAPI} from "@/services/problem-set/api";

const DataAnalyse: React.FC = () => {
  const [problemData, setProblemData] = useState<ProblemAPI.dataAnalysisProps>();
  const [userData, setUserData] = useState<ProblemAPI.dataAnalysisProps>();
  const [problemTotal, setProblemTotal] = useState<number>(0);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [data, setData] = useState<{ value: number; color: string }[]>([]);
  const config = {
    data,
    angleField: 'value',
    colorField: 'color',
    scale: {color: {range: [Color.NOTPASS, Color.EASY, Color.MEDIUM, Color.HARD]}},
    innerRadius: 0.93,
    legend: false,
    tooltip: false,
    annotations: [
      {
        type: 'text',
        style: {
          text: `全部\n\n${userTotal}\n——\n${problemTotal}`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 10,
        },
      },
    ],
  };

  const getData = async () => {
    const {code, data} = await getProblemDataAnalysisAPI();
    if (code === 200) {
      const problemData = data[0];
      const userData = data[1];
      const calculateTotal = (data: ProblemAPI.dataAnalysisProps) =>
        Number(data.easyNum) + Number(data.mediumNum) + Number(data.hardNum);
      const problemTotal = calculateTotal(problemData);
      const userTotal = calculateTotal(userData);
      const temp = [
        {value: Number(problemTotal - userTotal), color: Color.NOTPASS},
        {value: Number(userData.easyNum), color: Color.EASY},
        {value: Number(userData.mediumNum), color: Color.MEDIUM},
        {value: Number(userData.hardNum), color: Color.HARD},
      ];
      setData(temp)
      setProblemData(problemData);
      setUserData(userData);
      setProblemTotal(problemTotal);
      setUserTotal(userTotal);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Card title='当前进度' style={{borderRadius: 4}} bodyStyle={{padding: 4}}>
      <Row justify="space-around" align="middle">
        <Col span={10}>
          <div style={{width: '100%', height: 139}} id='main'>
            <Pie {...config} />
          </div>
        </Col>
        <Col span={14}>
          <Row>
            <Col span={8} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{fontSize: 14, color: Color.EASY, marginBottom: 8}}>简单</div>
              <div style={{fontSize: 18, color: '#5C5C5C'}}>{userData?.easyNum}</div>
              <div style={{borderTop: '.1px solid #E5E5E5', width: '25%'}}></div>
              <div style={{fontSize: 18, color: '#C4C4CF'}}>{problemData?.easyNum}</div>
            </Col>
            <Col span={8} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{fontSize: 14, color: Color.MEDIUM, marginBottom: 8}}>中等</div>
              <div style={{fontSize: 18, color: '#5C5C5C'}}>{userData?.mediumNum}</div>
              <div style={{borderTop: '.1px solid #E5E5E5', width: '25%'}}></div>
              <div style={{fontSize: 18, color: '#C4C4CF'}}>{problemData?.mediumNum}</div>
            </Col>
            <Col span={8} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <div style={{fontSize: 14, color: Color.HARD, marginBottom: 8}}>困难</div>
              <div style={{fontSize: 18, color: '#5C5C5C'}}>{userData?.hardNum}</div>
              <div style={{borderTop: '.1px solid #E5E5E5', width: '25%'}}></div>
              <div style={{fontSize: 18, color: '#C4C4CF'}}>{problemData?.hardNum}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default DataAnalyse
