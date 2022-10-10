import React from "react";
import { useParams } from "react-router-dom";
import { Layout, PageHeader } from "antd";
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
      </Content>
    </Layout>
  );
};

export default Dutyprecept;
