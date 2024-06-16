import React from "react";
import {Row, Space, Tag} from "antd";
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import {Viewer} from "@bytemd/react";
import './md-min.css'

type ContentProps = {
    problem: ProblemAPI.ProblemVO;
    difficultyColor: string;
}
const plugins = [gfm(), highlight()]


const Content: React.FC<ContentProps> = ({problem, difficultyColor}) => {
    const getDifficulty = (difficulty: number) => {
        switch (difficulty) {
            case 1:
                return '中等'
            case 2:
                return '困难'
            case 3:
                return '简单'
            default:
                return ''
        }
    }
    return (
        <div>
            <h1 className='title'>{problem.id}.{problem?.title}</h1>
            <Space size='small' style={{margin: '10px 0'}}>
                <span style={{color: difficultyColor, paddingRight: 8}}>
                   {getDifficulty(Number(problem.difficulty))}
                </span>
                <span style={{color: difficultyColor, paddingRight: 8}}>
                   {problem.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </span>
            </Space>
            <Row style={{margin: '20px 0'}}>
                <Viewer
                    value={problem?.content}
                    plugins={plugins}
                />
            </Row>
        </div>
    )
}

export default Content
