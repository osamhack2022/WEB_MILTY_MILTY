import React from "react";
import {
  Layout,
  PageHeader,
  Table,
  Tag,
  Form,
  Input,
  Button,
  Typography,
  Divider,
} from "antd";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;

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

const Report = () => {
  const { user } = useAuth();

  const onFinish = (values) => {
    const { description } = values;

    axios
      .post("/api/set-duty-request", {
        request_type: 0,
        request_usr: user.user_pid,
        request_reason: description,
        request_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("건의사항 등록에 성공하였습니다");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="건의 사항"
        />
        <div
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
            padding: "1rem",
          }}
        >
          <Typography.Title level={3}>
            나의 건의사항 & 오류신고 목록
          </Typography.Title>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 768 }}
            pagination={{ position: ["none", "none"] }}
            style={{ marginBottom: "10px" }}
          />
          <Divider />
          <Typography>
            <Typography.Title level={3}>
              건의사항 & 오류신고 작성하기
            </Typography.Title>
            <Typography.Paragraph>
              오류가 발생한 부분이나 건의사항이 있을 경우 관리자가 즉각 확인하여
              조치하여 답변하겠습니다.
            </Typography.Paragraph>
          </Typography>
          <Form onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="건의/오류 사항을 적어 주세요"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                제출하기
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Report;
