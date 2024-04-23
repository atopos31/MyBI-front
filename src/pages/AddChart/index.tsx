import { genChartByAiUsingPost } from '@/services/my-bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  message,
} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

const AddChart: React.FC = () => {
  const [chart, setchart] = useState<API.AIChartVO>();
  const [submitting, setsubmitting] = useState<boolean>();
  const [options, setoptions] = useState<any>();

  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }

    setsubmitting(true);
    console.log('Received values of form: ', values);
    const params = {
      ...values,
      upload: undefined,
    };
    const file = values.upload.file.originFileObj;
    try {
      const res = await genChartByAiUsingPost(params, {}, file);
      if (res.code != 0) {
        throw new Error("请求失败:" + res.message)
      }
      const chartOptions = JSON.parse(res.data?.genChart ?? '');
      if (!chartOptions) {
        throw new Error('解析失败!');
      } else {
        console.log(res.data?.genChart);
        message.success('分析成功！');
        setchart(null ?? undefined);
        setoptions(null);
        setchart(res.data);
        setoptions(chartOptions);
      }
    } catch (e: any) {
      message.error('失败！原因:' + e.message, 3);
    }

    setsubmitting(false);
  };

  return (
    <div className="AddChart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
            <Form name="addform" labelAlign="left" labelCol={{ span: 4 }} onFinish={onFinish}>
              <Form.Item
                label="图表名称"
                name="name"
                rules={[{ required: true, message: '请输入图表名称' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="分析目标"
                name="goal"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <Input.TextArea showCount maxLength={100} />
              </Form.Item>
              <Form.Item label="图表类型" name="charType" hasFeedback rules={[{ required: true }]}>
                <Select
                  placeholder="选择图表类型"
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '雷达图', label: '雷达图' },
                    { value: '饼图', label: '饼图' },
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item label="上传文件" name="upload" valuePropName="filelist">
                <Upload maxCount={1} accept=".xlsx">
                  <Form.Item>
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                  </Form.Item>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 1, offset: 4 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="分析结论">
            {submitting ? (
              <Spin tip="分析中">
                <div className="content" />
              </Spin>
            ) : (
              <div>{chart?.genResult ?? '请点击左侧提交'}</div>
            )}
          </Card>
          <Divider />
          <Card title="图表数据">
            {submitting ? (
              <Spin tip="生成中">
                <div className="content" />
              </Spin>
            ) : (
              <div>
                {options ? (
                  <ReactECharts
                    style={{ maxHeight: '600px', textAlign: 'center' }}
                    option={options}
                  />
                ) : (
                  '请点击左侧提交'
                )}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
