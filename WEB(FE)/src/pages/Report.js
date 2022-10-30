import React, { useState, useEffect, useCallback } from "react";
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
    render: (_, { status }) => {
      if (status === 1) return <Tag color="warning">처리중</Tag>;
      if (status === 2) return <Tag color="success">처리 완료</Tag>;
      return <Tag color="error">처리불가</Tag>;
    },
  },
];

const Report = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [data, setData] = useState();

  const fetchDutyRequest = useCallback(() => {
    axios
      .post("/api/user/get-report", {
        usr_pid: user.user_pid,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setData(
            response.data.request.map(({ pid, description, time, status }) => ({
              key: pid,
              index: pid,
              description,
              time,
              status,
            }))
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchDutyRequest();
  }, []);

  const onFinish = (values) => {
    const { description } = values;

    axios
      .post("/api/user/set-duty-request", {
        request_type: 0,
        request_usr: user.user_pid,
        request_reason: description,
        request_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("건의사항 등록에 성공하였습니다");
          fetchDutyRequest();
          form.resetFields();
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
          <Form form={form} onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="description"
              rules={[
                {
                  message: "내용을 작성해주세요",
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
                작성하기
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Report;
