import React from "react";
import {CheckCircleOutlined, CloseCircleOutlined, MinusCircleOutlined} from "@ant-design/icons";

export const Color = {
    EASY: '#00AF9B',
    MEDIUM: '#FFB800',
    HARD: '#FF2D55',
    NOTPASS:'#DFDFDF'
}

//Content页面
export const problemStatusColor = new Map<string, string>([
    ['已通过', Color.EASY],
    ['尝试过', Color.MEDIUM],
    ['未开始', Color.HARD]
]);
export const problemStatusIcon = new Map<string, any>([
    ['已通过', <CheckCircleOutlined key='passed'/>],
    ['尝试过', <CloseCircleOutlined key='tried'/>],
    ['未开始', <MinusCircleOutlined key='noLog'/>]
])
