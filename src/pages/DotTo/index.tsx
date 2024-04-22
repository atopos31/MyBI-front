import Bpmn from '@/components/bpmn';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

const DotTo: React.FC = () => {
  const data = {
    // 节点
    nodes: [
      {
        id: 50,
        type: 'rect',
        x: 100,
        y: 150,
        text: '好',
      },
      {
        id: 21,
        type: 'circle',
        x: 300,
        y: 150,
      },
    ],
    // 边
    edges: [
      {
        type: 'polyline',
        sourceNodeId: 50,
        targetNodeId: 21,
      },
    ],
  };
  const [bpmnData, setBpmnData] = useState<any>(data);
  const onClick = async () => {
    const tmp = {
      nodes: [
        {
          id: 1,
          type: 'rect',
          x: 100,
          y: 100,
        },
        {
          id: 2,
          type: 'circle',
          x: 200,
          y: 200,
        },
        {
          id: 3,
          type: 'rect',
          x: 300,
          y: 100,
        },
      ],
      edges: [
        {
          type: 'polyline',
          sourceNodeId: 1,
          targetNodeId: 2,
        },
        {
          type: 'polyline',
          sourceNodeId: 2,
          targetNodeId: 3,
        },
        {
          type: 'polyline',
          sourceNodeId: 3,
          targetNodeId: 1,
        },
      ],
    };
    const jsonString = `{
      "nodes": [
        {
          "id": 1,
          "type": "rect",
          "x": 100,
          "y": 100,
          "text": "Node 1"
        },
        {
          "id": 2,
          "type": "circle",
          "x": 200,
          "y": 200
        }
      ],
      "edges": [
        {
          "type": "polyline",
          "sourceNodeId": 1,
          "targetNodeId": 2
        }
      ]
    }`;
    console.log(bpmnData);
    setBpmnData(JSON.parse(jsonString));
  };

  return (
    
    <div className="dot" style={{border: "1px"}}>
      <PageContainer waterMarkProps={{content: ""}}>
      <Bpmn data={bpmnData}></Bpmn>
      <Button onClick={onClick}></Button>
      </PageContainer>
      
    </div>
  );
};
export default DotTo;
