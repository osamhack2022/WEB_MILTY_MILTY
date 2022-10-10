import React from "react";
import { useParams } from "react-router-dom";
import { Layout, PageHeader, Form, Input, Button } from "antd";
import Precept from "../components/Precept";

const { Content } = Layout;

const Dutyprecept = () => {
  const params = useParams();
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  console.log(params); // 날짜값 잘 넘어오는지 확인
  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title={`경계작전명령서 (${params.date})`}
        />
        <Precept />
        <div
          style={{
            backgroundColor: "#ECEBE2",
            padding: "1rem",
          }}
        >
          <Form
            name="change-form"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="서명"
              name="sign"
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                서명 제출
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Dutyprecept;
