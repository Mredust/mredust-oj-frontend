import React from "react";
import {Editor, Viewer} from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import '/public/css/md-min.css'

type mdEditorProps = {
    isEdit: boolean
    value: string;
    onChange?: React.Dispatch<React.SetStateAction<string>>
}

const MdEditor: React.FC<mdEditorProps> = ({isEdit, value, onChange}) => {
    const plugins = [gfm(), highlight()]
    return (
        <>
            {isEdit ?
                <Editor
                    value={value}
                    plugins={plugins}
                    onChange={onChange}
                /> :
                <Viewer
                    value={value}
                    plugins={plugins}
                />
            }
        </>
    )
}

export default MdEditor;
