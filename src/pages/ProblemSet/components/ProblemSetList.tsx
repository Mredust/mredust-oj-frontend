import React, {useState} from "react";
import {Button, Card, Col, Row, Select, Tag, Tooltip} from "antd";
import Search from "antd/es/input/Search";
import {CheckCircleOutlined, CloseCircleOutlined, TagsOutlined} from "@ant-design/icons";
import {history, useNavigate} from "@@/exports";
import {ProColumns, ProTable} from "@ant-design/pro-components";

const SafeProblemTable: React.FC = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  // const [dataSource, setDataSource] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  //搜索参数
  const [problemStatus, setProblemStatus] = useState<string>(() => {
    return urlSearchParams.get('status') || '全部';
  });
  const [pageNum, setPageNum] = useState(() => {
    return Number(urlSearchParams.get('pageNum')) || 1;
  });
  const [difficulty, setDifficulty] = useState<string>(() => {
    return urlSearchParams.get('difficulty') || '全部'
  });
  const [keyword, setKeyword] = useState<string>(() => {
    return urlSearchParams.get('keyword') || ''
  })
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    return urlSearchParams.getAll('tags') || [];
  });


  //有关搜索参数
  const updateQueryParam = (pageNum: number, status: string, difficulty: string, keyword: string, selectedTags: string[]) => {
    const params = new URLSearchParams({
      pageNum: pageNum.toString(),
      status,
      difficulty,
      keyword: keyword,
    });
    selectedTags.forEach(tag => params.append('tags', tag));
    //将搜索参数拼接到query上
    navigate({
      search: `?${params.toString()}`
    })
  }
  const changePage = (page: number) => {
    setPageNum(page);
    updateQueryParam(page, problemStatus, difficulty, keyword, selectedTags);
  }
  const changeStatus = (newStatus: string) => {
    setProblemStatus(newStatus);
    updateQueryParam(pageNum, newStatus, difficulty, keyword, selectedTags);
  }
  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    updateQueryParam(pageNum, problemStatus, newDifficulty, keyword, selectedTags);
  }
  const onSearch = (value: string) => {
    setKeyword(value);
    updateQueryParam(pageNum, problemStatus, difficulty, value, selectedTags);
  }
  const handleTagClose = (removeTag: string) => {
    const update = selectedTags.filter(tag => tag !== removeTag);
    setSelectedTags(update);
    updateQueryParam(pageNum, problemStatus, difficulty, keyword, update);
  }
  const addTagToParam = (addTag: string) => {
    const update = [...selectedTags, addTag];
    setSelectedTags(update);
    updateQueryParam(pageNum, problemStatus, difficulty, keyword, update);
  }

  //针对题目的操作
  const clickInspect = (id: number) => {
    history.push(`/problemset/${id}`)
  }
  const dataSource = [
    {
      id: 1,
      title: "两数之和",
      status: '已通过',
      acceptedNum: 20,
      submitNum: 44,
      difficulty: "中等"
    },
    {
      id: 2,
      title: "链表",
      status: '已通过',
      acceptedNum: 120,
      submitNum: 414,
      difficulty: "中等"
    },
    {
      id: 3,
      title: "图表",
      status: '未通过',
      acceptedNum: 10,
      submitNum: 4,
      difficulty: "困难"
    },
  ]

  const columns: ProColumns<any>[] = [
    {
      title: '状态',
      width: '5%',
      align: 'center',
      render: (_, problem) => (
        <>
          {
            problem.status === '尝试过' && <CloseCircleOutlined style={{fontSize: 18,}}/> ||
            problem.status === '已通过' && <CheckCircleOutlined style={{fontSize: 18,}}/>
          }
        </>
      ),
    },
    {
      title: '题目',
      width: '20%',
      ellipsis: true,
      render: (_, problem) => (
        <>{`${problem.id}. ${problem.title}`}</>
      ),
    },
    {
      title: '通过率',
      width: '10%',
      align: 'center',
      render: (dom, entity) => {
        return <>{((entity.acceptedNum / entity.submitNum || 0) * 100).toFixed(2)}%</>
      }
    },
    {
      title: '难度',
      width: '5%',
      align: 'center',
      render: (_, entity) => {
        return (<>
          {
            entity.difficulty === '简单' && <span style={{marginRight: 0}}>简单</span> ||
            entity.difficulty === '中等' && <span style={{marginRight: 0,}}>中等</span> ||
            entity.difficulty === '困难' && <span style={{marginRight: 0}}>困难</span>
          }
        </>)
      }
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '5%',
      align: 'center',
      render: (dom, entity) => {
        return (<>
          <Tooltip placement="top" title="查看" color="#FA541C">
            <Button onClick={() => clickInspect(entity.id)} type="text"></Button>
          </Tooltip>
        </>);
      },
    },
  ];

  return (<Card style={{borderRadius: 4}}>
    <Row style={{padding: '24px 24px 16px 24px'}}>
      <Col flex='150px'>
        题单：
        <Select
          value={problemStatus}
          style={{width: 90}}
          onChange={changeStatus}
          options={[
            {value: '全部', label: '全部'},
            {value: '未开始', label: '未开始'},
            {value: '尝试过', label: '尝试过'},
            {value: '已通过', label: '已通过'},
          ]}
        />
      </Col>
      <Col flex='140px'>
        难度：
        <Select
          value={difficulty}
          style={{width: 80}}
          onChange={changeDifficulty}
          options={[
            {value: '全部', label: '全部'},
            {value: '简单', label: '简单'},
            {value: '中等', label: '中等'},
            {value: '困难', label: '困难'},
          ]}
        />
      </Col>
      <Col flex='150px'>
        状态：
        <Select
          value={problemStatus}
          style={{width: 90}}
          onChange={changeStatus}
          options={[
            {value: '全部', label: '全部'},
            {value: '未开始', label: '未开始'},
            {value: '尝试过', label: '尝试过'},
            {value: '已通过', label: '已通过'},
          ]}
        />
      </Col>
      <Col flex='auto'>
        <Row justify="space-around" align="middle">
          <Col flex='66px'>
            <div style={{fontSize: 14}}>
              <TagsOutlined/>
              <span style={{marginLeft: 8}}>标签：</span>
            </div>
          </Col>
          <Col flex='auto'>
            <Select
              mode="multiple"
              showSearch={false}
              value={selectedTags}
              style={{width: '90%'}}
              dropdownStyle={{padding: 12}}
              tagRender={(tag) => {
                return (
                  <Tag closable={true} onClose={() => {
                    handleTagClose(tag.value)
                  }} style={{marginRight: 3}}>
                    {tag.value}
                  </Tag>
                )
              }}
              dropdownRender={() =>
                <div>
                  数组
                  {/* {options.map(option => selectedTags?.includes(option) ? */}
                  {/*   <Tag */}
                  {/*     onClick={() => handleTagClose(option)} */}
                  {/*     style={{cursor: 'pointer'}} color='#f50' key={option} */}
                  {/*   > */}
                  {/*     {option}<CheckOutlined/> */}
                  {/*   </Tag> : */}
                  {/*   <Tag onClick={() => addTagToParam(option)} style={{cursor: 'pointer'}} key={option}>{option}</Tag> */}
                  {/* )} */}
                </div>
              }
            />
          </Col>
        </Row>
      </Col>

      <Col flex='auto' style={{float: 'left'}}>
        <Search placeholder="搜索题目、编号或内容" allowClear onSearch={onSearch}/>
      </Col>
    </Row>

    <ProTable<any>
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      search={false}
      options={false}
      pagination={{
        showSizeChanger: true,
        total: total,
        current: pageNum,
        pageSize: 10,
        onChange: changePage
      }}
    />
  </Card>)
}

export default SafeProblemTable
