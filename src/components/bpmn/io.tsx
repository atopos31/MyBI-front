
import React from 'react';
import LogicFlow from '@logicflow/core';
import { Input, Image, Button } from 'antd';
import { DownloadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

// const downloadImg = require('./img/download.png');
// const photo = require('./img/img.png');
// const uploadImg = require('./img/upload.png');

type IProps = {
  lf: LogicFlow;
};

function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

type FileEventTarget = EventTarget & { files: FileList };

const BpmnIo: any = (props: IProps) => {
  const { lf } = props;
  const downloadXml = () => {
    const data = lf.getGraphData() as string;
    download('logic-flow.xml', data);
  };
  const uploadXml = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = (ev.target as FileEventTarget).files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        const xml = event.target.result as string;
        lf.render(xml);
      }
    };
    reader.readAsText(file); // you could also read images and other binaries
  };

  const downloadImage = async () => {
    const { lf } = props;
    lf.getSnapshot('', '#fff');
    // lf.extension.snapshot.getSnapshot();
  };
  return (
    <div className="graph-io">
      {/* <span title="下载 XML" onMouseDown={() => downloadXml()}>
        <Image preview={false} width={'10'} height={'10'}  alt="下载XML" />
      </span> */}
      {/* <VerticalAlignBottomOutlined title="下载图片" onMouseDown = {() => downloadImage()}/>
       */}
       <Button type="primary" icon={<DownloadOutlined />} onClick={(event)  => downloadImage()} >下载图片</Button>
      {/* <span id="download-img" title="下载图片" onMouseDown={() => downloadImage()}>
        <Image preview={false} width={'10'} height={'10'}  alt="下载图片" />
      </span> */}
      {/* <span id="upload-xml" title="上传 XML">
        <Input type="file" className="upload" onChange={(ev) => uploadXml(ev)} />
        <Image preview={false} width={'10'} height={'10'}alt="上传XML" />
      </span> */}
    </div>
  );
};

export default BpmnIo;

