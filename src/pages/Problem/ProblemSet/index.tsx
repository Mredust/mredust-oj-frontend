import {PageContainer,} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import ProblemSetList from "@/pages/Problem/ProblemSet/components/ProblemSetList";

const ProblemSet: React.FC = () => {
    return (
        <PageContainer style={{width:'60%',margin:'0 auto'}}>
            <ProblemSetList/>
        </PageContainer>
    );
};
export default ProblemSet;
