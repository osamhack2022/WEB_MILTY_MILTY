import React from "react";
import { useParams } from "react-router-dom";
import { Layout, PageHeader } from "antd";
import Precept from "../components/Precept";

const { Content } = Layout;

const Dutyprecept = () => {
  const params = useParams();

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
