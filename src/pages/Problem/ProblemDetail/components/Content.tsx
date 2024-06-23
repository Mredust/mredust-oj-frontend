import React from "react";
import {Row, Space, Tag} from "antd";
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import {Viewer} from "@bytemd/react";
import './md-min.css'
import {Color} from "@/utils/colorUtils";

type ContentProps = {
    problem: ProblemAPI.ProblemVO;
}
const plugins = [gfm(), highlight()]


const Content: React.FC<ContentProps> = ({problem}) => {
    type DifficultyLevel = 0 | 1 | 2;

    interface DifficultyInfo {
        color: string;
        text: string;
    }

    const difficultyMap: Record<DifficultyLevel, DifficultyInfo> = {
        0: {
            color: Color.EASY,
            text: '简单',
        },
        1: {
            color: Color.MEDIUM,
            text: '中等',
        },
        2: {
            color: Color.HARD,
            text: '困难',
        }
    };
    let level = problem.difficulty as DifficultyLevel;
    const {color, text} = difficultyMap[level];
    return (
        <div style={{padding: '0 10px'}}>
            <h1 className='title'>{problem.id}.{problem?.title}</h1>
            <Space size='small' style={{margin: '10px 0'}}>
            <span style={{color: color, paddingRight: 8}}>
                {text}
            </span>
                <span style={{color: color, paddingRight: 8}}>
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
