import { listMyGraphVoByPageUsingPost } from '@/services/my-bi/graphController';
import { Card, List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet, Link, history, useModel } from '@umijs/max';


const App: React.FC = () => {
  const initgraphSize = { pageSize: 18, current: 1, sortField: 'createTime', sortOrder: 'desc' };
  const [searchParams, setSearchParams] = useState<API.GraphQueryRequest>({ ...initgraphSize });
  const [graphList, setgraphList] = useState<API.Graph[]>();
  const [total, setTotal] = useState<number>();

  const loadData = async () => {
    try {
      const res = await listMyGraphVoByPageUsingPost(searchParams);
      if (res.data) {
        const allowgraph = res.data.records?.filter((item) => {
          try {
            JSON.parse(item.gengraph ?? '');
            const dateObj: Date = new Date(item.createtime ?? '');
            item.createtime = dateObj.toISOString().slice(0, 16).replace('T', ' ');
            return true;
          } catch (error) {
            return false;
          }
        });
        setgraphList(allowgraph);
        setTotal(res.data.total);
      } else {
        throw new Error('获取图表数据失败！');
      }
    } catch (e: any) {
      message.error('请求失败:' + e.message, 3);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={graphList}
      pagination={{
        onChange: (page, pageSize) => {
          setSearchParams({
            ...searchParams,
            current: page,
            pageSize,
          });
        },
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        total: total,
      }}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            // window.location.href="/dot_to?id=" + item.id
            history.push("/dot_to?id="+item.id);
          }}
        >
          <Card title={item.name}>{item.goal}</Card>
        </List.Item>
      )}
    />
  );
};

export default App;
