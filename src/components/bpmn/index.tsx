import LogicFlow from '@logicflow/core';
import {
  BpmnElement,
  BpmnXmlAdapter,
  Snapshot,
  Control,
  Menu,
  SelectionSelect,
  NodeResize,
} from '@logicflow/extension';
import './index.css';
import '@logicflow/extension/lib/style/index.css';
import '@logicflow/core/dist/style/index.css';
import { useEffect, useRef, useState } from 'react';
import BpmnPattern from './pattern';
import BpmnIo from './io';
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
//   width: 1500,
  height: 600,
};

const index =  ({ data }: { data: any })=> {
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
    lf.render(data)
    setLfData(lf);
  }, []);
  //监听data更改
  useEffect(() => {
    if (!lfData) return;
    // setIState(() => true);
    lfData.render(data)
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

