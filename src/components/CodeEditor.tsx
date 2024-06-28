import React from "react";
import MonacoEditor from "react-monaco-editor";


type codeEditorProps = {
    height: string | number;
    language: string;
    value: string;
    onChange: (value: string) => void;
}

const CodeEditor: React.FC<codeEditorProps> = ({height, language, value, onChange}) => {
    const width = '100%';
    const options: any = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        scrollBeyondLastLine: false,
        scrollbar: {
            horizontalScrollbarSize: 8,
            verticalScrollbarSize: 8,
        },
        fontSize: 13,
        tabSize: 2,
        minimap: {
            enabled: false
        },
        automaticLayout: true
    };
    return (
        <MonacoEditor
            height={height}
            width={width}
            options={options}
            language={language}
            value={value}
            onChange={onChange}
        />
    )
}


export default CodeEditor;
