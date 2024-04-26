import { listMyChartVoByPageUsingPost } from '@/services/my-bi/chartController';
import { PageContainer } from '@ant-design/pro-components';
import { Col, List, Row, message } from 'antd';
import EChartsReact from 'echarts-for-react';
import React, { useEffect, useState } from 'react';


const MyChart: React.FC = () => {
  const initChartSize = { pageSize: 3, current: 1, sortField: 'createTime', sortOrder: 'desc' };
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initChartSize });

  const [chartList, setchartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>();

  const loadData = async () => {
    try {
      const res = await listMyChartVoByPageUsingPost(searchParams);
      if (res.data) {
        const allowChart = res.data.records?.filter((item) => {
          try {
            JSON.parse(item.genChart ?? '');
            const dateObj: Date = new Date(item.createTime ?? '');
            item.createTime = dateObj.toISOString().slice(0, 16).replace('T', ' ');
            return true;
          } catch (error) {
            return false;
          }
        });
        setchartList(allowChart);
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
    <div className="chartData">
      <PageContainer waterMarkProps={{ content: '' }}>
        <List
          itemLayout="vertical"
          size="small"
          bordered={true}
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
          dataSource={chartList}
          renderItem={(item) => (
            <List.Item key={item.id} actions={[]} extra={<div></div>}>
              <List.Item.Meta title={item.name} description={item.charType} />
              <Row gutter={24} justify="space-between">
                <Col span={12}>
                  <div style={{ marginBottom: 0 }}>{item.genResult}</div>
                </Col>
                <Col span={12}>
                  <EChartsReact option={JSON.parse(item.genChart ?? '')} />
                </Col>
              </Row>
              <div style={{ marginBottom: 0, fontSize: 13 }}>{item.createTime}</div>
            </List.Item>
          )}
        />
      </PageContainer>
    </div>
  );
};

export default MyChart;
