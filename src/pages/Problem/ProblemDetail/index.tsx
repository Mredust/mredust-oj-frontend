import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row, Skeleton, Space} from "antd";
import Content from "@/pages/Problem/ProblemDetail/components/Content";
import {Color} from "@/utils/colorUtils";
import "./index.less";
import Editor from "@/pages/Problem/ProblemDetail/components/Editor";
import {useParams} from "react-router";
import {IconFont} from "@/utils/iconUtil";

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
        const data = {
            id: 1,
            title: "两数之和",
            content:
                "给定一个整数数组 \\`nums\\` 和一个整数目标值 \\`target\\`，请你在该数组中找出 **和为目标值** *\\`target\\`* 的那 **两个** 整数，并返回它们的数组下标。\n" +
                "\n" +
                "你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。\n" +
                "\n" +
                "你可以按任意顺序返回答案。\n" +
                "\n" +
                "**示例 1：**\n" +
                "\n" +
                "> **输入**：nums = [2，7，11，15]，target = 9\n" +
                ">\n" +
                "> **输出**：[0，1]\n" +
                ">\n" +
                "> **解释**：因为 nums[0] + nums[1] == 9 ，返回 [0，1]。\n" +
                "\n" +
                "**示例2：**\n" +
                "\n" +
                "> **输入**：nums = [3，2，4]，target = 6\n" +
                ">\n" +
                "> **输出**：[1，2]\n" +
                "\n" +
                "**示例3：**\n" +
                "\n" +
                "> **输入**：nums = [3，3]，target = 6\n" +
                ">\n" +
                "> **输出**：[0，1]\n" +
                "\n" +
                "\n" +
                "\n" +
                "**提示：**\n" +
                "\n" +
                "- \\`2 <= nums.length <= 104\\`\n" +
                "- \\`-109 <= nums[i] <= 109\\`\n" +
                "- \\`-109 <= target <= 109\\`\n" +
                "- **只会存在一个有效答案**\n" +
                "\n" +
                "\n" +
                "\n" +
                "**进阶：** 你可以想出一个时间复杂度小于 \\`O(n2)\\` 的算法吗？\n",
            difficulty: 1,
            tags: ["数组", "哈希表"],
            answer: "无",
            submitNum: 10,
            acceptedNum: 5,
            judgeCase: [{
                input: "1 2",
                output: "3"
            }, {
                input: "3 4",
                output: "7"
            }],
            judgeConfig: {/* judge config object */},
            thumbNum: 20,
            favourNum: 15,
            userId: 123,
            createTime: "2024-06-10T08:00:00Z", // 使用 ISO 8601 格式表示时间
            updateTime: "2024-06-10T08:30:00Z"
        };
        switch (data.difficulty) {
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
        setProblem(data)
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
