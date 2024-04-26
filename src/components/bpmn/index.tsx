import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';
import {
  BpmnElement,
  Control,
  Menu,
  NodeResize,
  SelectionSelect,
  Snapshot,
} from '@logicflow/extension';
import '@logicflow/extension/lib/style/index.css';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './index.css';
import BpmnIo from './io';
import BpmnPattern from './pattern';
const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  metaKeyMultipleSelected: true,
  grid: {
    size: 10,
    type: 'dot',
  },
  keyboard: {
    enabled: true,
  },
  snapline: true,
  // width: 1500,
  height: 600,
};

const index = ({ data }: { data: any }) => {
  const refContainer = useRef<any>();
  const [lfData, setLfData] = useState<any>(null);
  useEffect(() => {
    LogicFlow.use(BpmnElement);
    // LogicFlow.use(BpmnXmlAdapter);
    LogicFlow.use(Snapshot);
    LogicFlow.use(Control);
    LogicFlow.use(Menu);
    LogicFlow.use(SelectionSelect);
    LogicFlow.use(NodeResize);
    // use 必须放上面
    const lf = new LogicFlow({
      container: document.querySelector('#graph') as HTMLElement,
      // container: refContainer.current,
      ...config,
    });
    // console.log(data)
    lf.render(data);
    setLfData(lf);
  }, []);
  //监听data更改
  useEffect(() => {
    if (!lfData) return;
    // setIState(() => true);
    try {
      lfData.render(data);
    } catch (e: any) {
      message.error('解析数据失败，请重新生成', 3);
    }
  }, [data]);

  return (
    <div className="bpmn-example-container">
      <div id="graph" ref={refContainer} className="viewport"></div>
      {lfData && (
        <>
          <BpmnPattern lf={lfData} />
          <BpmnIo lf={lfData} />
        </>
      )}
    </div>
  );
};
export default index;
