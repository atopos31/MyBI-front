import React, { useEffect } from 'react';
import LogicFlow from '@logicflow/core';

type IProps = {
  lf: LogicFlow;
};

const BpmnPattern = (props: IProps) => {
  const { lf } = props;
  useEffect(() => {
    lf &&
      lf.on('selection:selected', () => {
        lf.updateEditConfig({
          stopMoveGraph: false,
        });
      });
  }, [lf]);
  const addStartNode = () => {
    lf.dnd.startDrag({
      type: 'bpmn:startEvent',
      text: '开始',
    });
  };
  const addUserTask = () => {
    lf.dnd.startDrag({
      type: 'bpmn:userTask',
    });
  };
  const addServiceTask = () => {
    lf.dnd.startDrag({
      type: 'bpmn:serviceTask',
    });
  };
  const addGateWay = () => {
    lf.dnd.startDrag({
      type: 'bpmn:exclusiveGateway',
    });
  };
  const addEndNode = () => {
    lf.dnd.startDrag({
      type: 'bpmn:endEvent',
      text: '结束',
    });
  };
  const openSelection = () => {
    lf.updateEditConfig({
      stopMoveGraph: true,
    });
  };

  const onMouseDownFun = (type: any) => {
    switch (type) {
      case 'openSelection':
        lf.updateEditConfig({
          stopMoveGraph: true,
        });
        break;
      case 'addStartNode':
        lf.dnd.startDrag({
          type: 'bpmn:startEvent',
          text: '开始',
        });
        break;
      case 'addUserTask':
        lf.dnd.startDrag({
          type: 'bpmn:userTask',
        });
        break;
      case 'addServiceTask':
        lf.dnd.startDrag({
          type: 'bpmn:serviceTask',
        });
        break;
      case 'addGateWay':
        lf.dnd.startDrag({
          type: 'bpmn:exclusiveGateway',
        });
        break;
      case 'addEndNode':
        lf.dnd.startDrag({
          type: 'bpmn:endEvent',
          text: '结束',
        });
        break;
      case 'circle':
        lf.dnd.startDrag({
          type: 'circle',
          text: '圆形',
        });
        break;
      case 'rect':
        lf.dnd.startDrag({
          type: 'rect',
          text: '矩形',
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="pattern">
      <div className="pattern-selection" onMouseDown={() => onMouseDownFun('openSelection')} />
      <div>选区</div>
      <div className="pattern-start" onMouseDown={() => onMouseDownFun('addStartNode')} />
      <div>开始</div>
      <div className="pattern-user" onMouseDown={() => onMouseDownFun('addUserTask')}></div>
      <div>用户任务</div>
      <div className="pattern-user" onMouseDown={() => onMouseDownFun('addServiceTask')}></div>
      <div>系统任务</div>
      <div className="pattern-circle" onMouseDown={() => onMouseDownFun('circle')}></div>
      <div>圆形</div>
      <div className="pattern-rect" onMouseDown={() => onMouseDownFun('rect')}></div>
      <div>矩形</div>
      <div className="pattern-condition" onMouseDown={() => onMouseDownFun('addGateWay')}></div>
      <div>条件判断</div>
      <div className="pattern-end" onMouseDown={() => onMouseDownFun('addEndNode')}></div>
      <div>结束</div>
    </div>
  );
};

export default BpmnPattern;

