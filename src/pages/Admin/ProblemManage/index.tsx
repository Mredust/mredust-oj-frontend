import {CheckOutlined, PlusOutlined, TagsOutlined} from '@ant-design/icons';
import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Card, Col, message, Popconfirm, Row, Select, Space, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {deleteProblemAPI, getProblemListAPI} from "@/services/problem-set/api";
import moment from "moment";
import {history} from "@umijs/max";
import Search from "antd/es/input/Search";
import {useNavigate} from "umi";
import {Color} from "@/utils/colorUtils";
import {IconFont} from "@/utils/iconUtil";

const ProblemManage: React.FC = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  const [visible, setVisible] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<number>(-1);
  const [dataSource, setDataSource] = useState<ProblemAPI.ProblemVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  //搜索参数
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

  const [options, setOptions] = useState<any[]>([]);

  //重新获取数据
  const reloadData = () => {
    const params = {
      pageNum: pageNum,
    }
    setLoading(true);
    getProblemListAPI({...params} as ProblemAPI.ProblemQueryRequest).then(res => {
      if (res.code === 200) {
        setDataSource(res.data.records);
        setTotal(res.data.total)
        setLoading(false);
      }
    })
  }

  //监听路径参数变化
  useEffect(() => {
    reloadData()
  }, [location.search]);

  //有关搜索参数
  const updateQueryParam = (pageNum: number, difficulty: string, keyword: string, selectedTags: string[]) => {
    const params = new URLSearchParams({
      pageNum: pageNum.toString(),
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
    //将参数拼接到path上
    setPageNum(page);
    updateQueryParam(page, difficulty, keyword, selectedTags);
  }
  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    updateQueryParam(pageNum, newDifficulty, keyword, selectedTags);
  }
  const onSearch = (value: string) => {
    setKeyword(value);
    updateQueryParam(pageNum, difficulty, value, selectedTags);
  }
  const handleTagClose = (removeTag: string) => {
    const update = selectedTags.filter(tag => tag !== removeTag);
    setSelectedTags(update);
    updateQueryParam(pageNum, difficulty, keyword, update);
  }
  const addTagToParam = (addTag: string) => {
    const update = [...selectedTags, addTag];
    setSelectedTags(update);
    updateQueryParam(pageNum, difficulty, keyword, update);
  }


  //针对题目的操作
  const clickInspect = (id: number) => {
    history.push(`/problemset/${id}`)
  }

  const clickEdit = (id: number) => {
    setVisible(true);
    setTargetId(id);
  }

  const handleDelete = (id: number) => {
    deleteProblemAPI({id}).then(res => {
      if (res.code === 200) {
        message.info('成功删除！');
        reloadData()
      }
    })
  }

  const handleAddProblem = () => {
    history.push('/admin/problem-manage/create')
  }

  const columns: ProColumns<ProblemAPI.ProblemVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: '5%',
      align: 'center'
    },
    {
      title: '题目',
      width: '20%',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '标签',
      ellipsis: true,
      width: '18%',
      render: (_, record) => (
        <Space>
          {record.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '通过率',
      width: '8%',
      align: 'center',
      render: (dom, record) => {
        return <>{((record.acceptedNum / record.submitNum || 0) * 100).toFixed(2)}%</>
      }
    },
    {
      title: '难度',
      width: '5%',
      align: 'center',
      render: (_, record) => {
        return (<>
          {
            record.difficulty === 0 && <span style={{marginRight: 0, color: Color.EASY}}>简单</span> ||
            record.difficulty === 1 &&
            <span style={{marginRight: 0, color: Color.MEDIUM}}>中等</span> ||
            record.difficulty === 2 && <span style={{marginRight: 0, color: Color.HARD}}>困难</span>
          }
        </>)
      }
    },
    {
      title: '判题配置',
      width: '22%',
      render: (dom, record) => {
        return (
          <>
            <Tag icon={<IconFont type='icon-miaobiao'/>}>{record.judgeConfig?.timeLimit}ms</Tag>
            <Tag icon={<IconFont type='icon-neicun'/>}>{record.judgeConfig?.memoryLimit}MB</Tag>
            <Tag icon={<IconFont type='icon-kongjian'/>}>{record.judgeConfig?.stackLimit}MB</Tag>
          </>
        )
      }
    },
    {
      title: '创建时间',
      width: '12%',
      render: (dom, record) => {
        return <>
          {moment(new Date(record.createTime).toISOString()).format('YYYY-MM-DD HH:mm:ss')}
        </>
      }
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '10%',
      align: 'center',
      render: (dom, record) => {
        return (<>
          <Tooltip placement="top" title="查看" color="#FA541C">
            <Button onClick={() => clickInspect(record.id)} type="text" icon={
              <IconFont type='icon-chakan'/>}></Button>
          </Tooltip>

          <Tooltip placement="top" title="编辑" color="#FA541C">
            <Button onClick={() => clickEdit(record.id)} type="text" icon={
              <IconFont type='icon-bianji'/>}></Button>
          </Tooltip>

          <Popconfirm onConfirm={() => handleDelete(record.id)} title="删除题目" description="确定要删除该题目？" okText="确定" cancelText="取消">
            <Button type="text" icon={<IconFont type='icon-shanchu'/>}></Button>
          </Popconfirm>
        </>);
      },
    },
  ];

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <Card bodyStyle={{padding: 0}} style={{borderRadius: 4}}>
      <Row style={{padding: '24px 24px 0 24px'}}>
        <Col flex='160px'>
          难度：
          <Select
            value={difficulty}
            onChange={changeDifficulty}
            options={[
              {value: '全部', label: '全部'},
              {value: '简单', label: '简单'},
              {value: '中等', label: '中等'},
              {value: '困难', label: '困难'},
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
                style={{width: '60%'}}
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
                    {options.map(option => selectedTags?.includes(option) ?
                      <Tag
                        onClick={() => handleTagClose(option)}
                        style={{cursor: 'pointer'}} color='#f50' key={option}
                      >
                        {option}<CheckOutlined/>
                      </Tag> :
                      <Tag onClick={() => addTagToParam(option)} style={{cursor: 'pointer'}} key={option}>{option}</Tag>
                    )}
                  </div>
                }
              />
            </Col>
          </Row>

        </Col>


        <Col flex='300px' style={{float: 'right'}}>
          <Search placeholder="输入搜索关键词" allowClear onSearch={onSearch}/>
        </Col>
      </Row>

      <ProTable<ProblemAPI.ProblemVO>
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          total: total,
          current: pageNum,
          pageSize: 10,
          onChange: changePage
        }}
        headerTitle="题库列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined/>} onClick={handleAddProblem} type="primary">
            新建题目
          </Button>,
        ]}
      />

      {/* <CreateUpdateModal */}
      {/*   visible={visible} */}
      {/*   targetId={targetId} */}
      {/*   onCancel={modalCancel} */}
      {/*   reloadData={reloadData} */}
      {/* /> */}
    </Card>);
};

export default ProblemManage;
