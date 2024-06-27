import React from "react";
import {Row, Space, Tag} from "antd";
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import {Viewer} from "@bytemd/react";
import './md-min.css'

type ContentProps = {
  problem: ProblemAPI.ProblemVO;
}
const plugins = [gfm(), highlight()]


const Content: React.FC<ContentProps> = ({problem}) => {
  return (
    <div style={{padding: '0 10px'}}>
      <h1 className='title'>{problem.id}.{problem?.title}</h1>
      <Space size='small' style={{margin: '10px 0'}}>
            <span style={{paddingRight: 8}}>
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
