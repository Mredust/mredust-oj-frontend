import {Divider, Select} from "antd";
import MonacoEditor from "react-monaco-editor";
import React, {useEffect, useState} from "react";
import {getProblemLanguageAPI} from "@/services/problem-set/api";

type EditorProps = {
  code: string;
  language: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<EditorProps> = ({
                                         code,
                                         setCode,
                                         language,
                                         setLanguage,
                                       }) => {
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
  const [languageOption, setLanguageOption] = useState<{ value: string, label: string }[]>([]);
  useEffect(() => {
    getProblemLanguageAPI().then(res => {
      const {code, data} = res;
      if (code === 200) {
        let obj = data.map(item => {
          // 默认情况下直接返回原始值
          return {
            value: item,
            label: item,
          };
        });
        setLanguageOption(obj)
      }
    })

  }, [])

  return (
    <>
      <div>
        <Select
          size='small'
          value={language}
          onChange={(value) => {
            setLanguage(value);
          }}
          style={{width: 100, height: 30, margin: '5px 0 5px 10px'}}
          options={languageOption}
        />
        <Divider style={{margin: '5px 0 0 0'}}/>
      </div>
      <div style={{flexGrow: 1, marginBottom: 2, overflow: 'auto',}}>
        <MonacoEditor
          height='100%'
          width={'100%'}
          options={options}
          language={language}
          value={code}
          onChange={setCode}
        />
      </div>

    </>
  )
}

export default Editor;
