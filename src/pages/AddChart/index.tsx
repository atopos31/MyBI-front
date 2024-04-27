import { addChartUsingPost, genChartByAiUsingPost } from '@/services/my-bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
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
import React, { useEffect, useState } from 'react';
import KeepAlive from 'react-activation';

const AddChart: React.FC = () => {
  const [form] = Form.useForm();
  const [chart, setchart] = useState<API.Chart>();
  const [submitting, setsubmitting] = useState<boolean>();
  const [options, setoptions] = useState<any>();
  const [isave,setissave] = useState<boolean>(false);

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
    const file = values.upload.file;
    try {
      const res = await genChartByAiUsingPost(params, {}, file);
      if (res.code != 0) {
        throw new Error('请求失败:' + res.message);
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
        setissave(false)
      }
    } catch (e: any) {
      message.error('失败！原因:' + e.message, 3);
    }

    setsubmitting(false);
  };
  //重置的回调函数，在清空form表单的基础上，清除分析结论和图表数据
  const reset = async () => {
    setchart(undefined);
    setoptions(null);
    setissave(false)
  };

  //收藏的回调函数
  const save = async () => {
    if (isave) {
      message.success("已收藏")
      return
    }
    const body = {
      ...chart,
    };
    try {
      const res = await addChartUsingPost(body);
      if (res.code != 0) {
        throw new Error('请求失败:' + res.message);
      }
      message.success("收藏成功!")
      setissave(true)
    } catch {
      message.error("收藏失败！",3)
    }
  };

  return (
    <div className="AddChart">
      <KeepAlive cacheKey="chart">
        <PageContainer waterMarkProps={{ content: '' }}>
          <Row gutter={24}>
            <Col span={12}>
              <Card title="参数">
                <Form
                  name="addform"
                  form={form}
                  labelAlign="left"
                  labelCol={{ span: 4 }}
                  onFinish={onFinish}
                >
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
                  <Form.Item
                    label="图表类型"
                    name="charType"
                    hasFeedback
                    rules={[{ required: true }]}
                  >
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

                  <Form.Item rules={[{required: true}]} label="上传文件" name="upload" valuePropName="filelist">
                    <Upload beforeUpload={()=>{return false}} maxCount={1} accept=".xlsx">
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
                      <Button htmlType="reset" onClick={reset}>
                        重置
                      </Button>
                      <Button disabled={submitting ? true : chart?false:true} type="primary" onClick={save}>
                        {isave ? "已收藏": "收藏"}
                      </Button>
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
        </PageContainer>
      </KeepAlive>
    </div>
  );
};
export default AddChart;
