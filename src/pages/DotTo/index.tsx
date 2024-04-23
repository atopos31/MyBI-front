import Bpmn from '@/components/bpmn';
import { genGraphByAiUsingPost } from '@/services/my-bi/graphController';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Row, Space, message } from 'antd';
import { Divider } from 'rc-menu';
import React, { useState } from 'react';

const DotTo: React.FC = () => {
  const [bpmnData, setBpmnData] = useState<any>();
  const [submitting, setsubmitting] = useState<boolean>();

  const onFinish = async (values: any) => {
    if (submitting) {
      return
    }
    setsubmitting(true)
    const res = await genGraphByAiUsingPost(values)
    console.log(res)
    setsubmitting(false)
    message.success("请求成功")
    setBpmnData(JSON.parse(res.data?.genGraph ?? ""))
  };

  return (
    <div className="dot" style={{ border: '1px' }}>
      <PageContainer style={{ height: 600 }} waterMarkProps={{ content: '' }}>
        <Bpmn data={bpmnData}></Bpmn>
        <Row gutter={24}>
          <Col span={24}>
            <br />
          <Card>
          <Form name="addform" labelAlign="left" labelCol={{ span: 4 }} onFinish={onFinish}>
              <Form.Item
                label="流程图需求"
                name="goal"
                rules={[{ required: true, message: '流程图需求' }]}
              >
                <Input.TextArea showCount />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 1, offset: 4 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    生成
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
            </Card>

          </Col>
          <Col span={12}></Col>
        </Row>
      </PageContainer>
    </div>
  );
};
export default DotTo;
