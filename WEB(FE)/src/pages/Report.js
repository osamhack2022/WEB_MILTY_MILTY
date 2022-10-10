import { UploadOutlined } from '@ant-design/icons';
import {
  Layout,
  PageHeader,
  Table,
  Tag,
  Form,
  Input,
  Space,
  Upload,
  Button
} from 'antd';
import React from 'react';

const { Content } = Layout;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
const columns = [
  {
    title: "번호",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "내용",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "시간",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "처리 상태",
    key: "status",
    render: (_, { status }) =>
      status ? (
        <Tag color="success">처리 완료</Tag>
      ) : (
        <Tag color="warning">처리중</Tag>
      ),
  },
];
const data = [
  {
    key: 1,
    index: 1,
    description: "운전병 장거리 배차 전날에는 야간 근무를 넣지 말아주세요.",
    time: "2022-10-01 00:00",
    status: false,
  },
];

const Dutycount = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="나의 오류신고&건의사항 목록"
        />
        <div
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
            padding: "1rem",
          }}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 768 }}
            pagination={{ position: ["none", "none"] }}
            style={{ marginBottom: "10px" }}
          />
          <div>
            오류가 발생한 부분이나 건의사항이 있을 경우
            관리자가 즉각 확인하여 조치하여 답변하겠습니다.<br />
            (사진 첨부하면 정확한 답변이 가능합니다)
          </div>
          <Form
            name="change-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="change-reason"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="건의/오류 사항을 적어 주세요" />
            </Form.Item>

            <Space>
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload name="logo" accept=".jpg,.jpeg,.png" action="/upload.do" listType="text">
                  <Button icon={<UploadOutlined />}>사진 첨부</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  제출하기
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </Content>
    </Layout>
  )
};

export default Dutycount;
