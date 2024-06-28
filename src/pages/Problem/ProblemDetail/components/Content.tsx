import React from "react";
import {Row, Space, Tag} from "antd";
import MdEditor from "@/components/MdEditor";

type ContentProps = {
    problem: ProblemAPI.ProblemVO;
}


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
                <MdEditor isEdit={false} value={problem?.content}/>
            </Row>
        </div>
    )
}

export default Content
