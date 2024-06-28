import React, {useRef, useState} from "react";
import {Flex, Input, InputRef, Tag, Tooltip} from "antd";
import {PlusOutlined} from "@ant-design/icons";

type ProblemTagProps = {
    tags: string[];
    setTags: (tags: string[]) => void;
}

const tagPlusStyle: React.CSSProperties = {
    height: 22,
    borderStyle: 'dashed',
};
const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
};
const ProblemTag: React.FC<ProblemTagProps> = ({tags, setTags}) => {
    const editInputRef = useRef<InputRef>(null);
    const inputRef = useRef<InputRef>(null);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputValue, setEditInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const showInput = () => {
        setInputVisible(true);
    };
    return (
        <Flex gap="4px 0" wrap>
            {tags.map<React.ReactNode>((tag, index) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={editInputRef}
                            key={tag}
                            size="small"
                            style={tagInputStyle}
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag
                        key={tag}
                        closable={true}
                        style={{userSelect: 'none'}}
                        onClose={() => handleClose(tag)}
                        color={'blue'}
                    >
                      <span onDoubleClick={(e) => {
                          if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag);
                              e.preventDefault();
                          }
                      }}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} icon={<PlusOutlined/>} onClick={showInput} color={'blue'}>
                    添加标签
                </Tag>
            )}
        </Flex>
    )
}

export default ProblemTag
