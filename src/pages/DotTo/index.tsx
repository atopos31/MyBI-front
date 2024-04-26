import Bpmn from '@/components/bpmn';
import { addGraphUsingPost, genGraphByAiUsingPost, getGraphVoByIdUsingGet } from '@/services/my-bi/graphController';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Button, Card, Col, Form, Input, Row, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';

const DotTo: React.FC = () => {
  const location = useLocation();
  // 从 location.search 中提取查询参数
  const params = new URLSearchParams(location.search);
  // 获取名为 'redirect' 的查询参数的值
  const redirectParam = params.get('id');

  
  console.log(redirectParam)
  const [bpmnData, setBpmnData] = useState<any>();
  const [resultData, setresultData] = useState<any>();
  const [submitting, setsubmitting] = useState<boolean>();
  const [isave,setissave] = useState<boolean>(false);
  const [databody,setdatabody] = useState<API.GraphAddRequest>();

  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    setsubmitting(true);
    try {
      const res = await genGraphByAiUsingPost(values);
      if (res.code != 0) {
        throw new Error('请求失败' + res.message);
      }
      message.success('请求成功');
      setBpmnData(JSON.parse(res.data?.gengraph ?? ''));
      setresultData(res.data?.genresult)
      setdatabody(res.data)
    } catch (e: any) {
      message.error('分析失败！原因:' + e.message + "   请重试", 3);
    }

    setsubmitting(false);
  };
    //收藏的回调函数
    const save = async () => {
      if (isave) {
        message.success("已收藏")
        return
      }
      const body = {
        ...databody,
      };
      try {
        const res = await addGraphUsingPost(body)
        if (res.code != 0) {
          throw new Error('请求失败:' + res.message);
        }
        message.success("收藏成功!")
        setissave(true)
      } catch {
        message.error("收藏失败！",3)
      }
    };

  const reset = async () => {
    setBpmnData(undefined)
    setresultData(undefined)
    setissave(false)
  };
  useEffect( () => {
    if (redirectParam) {
      (async () => {
        const res = await getGraphVoByIdUsingGet({id:Number(redirectParam)});
        if (res.code != 0) {
          throw new Error('请求失败' + res.message);
        }
        message.success('请求成功');
        setBpmnData(JSON.parse(res.data?.gengraph ?? ''));
        setresultData(res.data?.genresult)
        setdatabody(res.data)
      })(); // 这里添加了括号来调用异步函数
    }
}, []);


  return (
    <div className="dot" style={{ border: '1px' }}>
      <PageContainer waterMarkProps={{content:""}}>
        <Bpmn data={bpmnData}></Bpmn>
        <br />

        <Row gutter={24}>
          <Col span={12}>
            <Card title="参数">
              <Form name="addform" labelAlign="left" labelCol={{ span: 4 }} onFinish={onFinish}>
                <Form.Item label="流程图名称" name="name" rules={[{required:true,message:"请输入流程图名称"}]}>
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="流程图需求"
                  name="goal"
                  rules={[{ required: true, message: '请输入需求' }]}
                >
                  <Input.TextArea showCount autoSize={{minRows: 3,maxRows: 4}}/>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 1, offset: 4 }}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={submitting}
                      disabled={submitting}
                    >
                      {bpmnData ? "重新生成" : "生成"}
                    </Button>
                    <Button htmlType="reset">重置</Button>
                    <Button disabled={submitting ? true : resultData?false:true} type="primary" onClick={save}>
                        {isave ? "已收藏": "收藏"}
                      </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="文字说明">
              {resultData ?? "请先点击左侧生成"}
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default DotTo;
