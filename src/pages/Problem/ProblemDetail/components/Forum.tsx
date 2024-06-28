import React from "react";

type AnsProps = {
    answer: string;
}
const labelStyle: React.CSSProperties = {
    padding: '0 20px',
    maxHeight: 'calc(100vh - 132px)',
    overflow: 'auto',
};

const Forum: React.FC<AnsProps> = () => {
    return (
        <div style={labelStyle}>
            TODO：题解论坛
        </div>
    )
}

export default Forum
