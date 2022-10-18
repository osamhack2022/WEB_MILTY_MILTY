import React, { useEffect } from "react";
import { Layout, Col, Row, Typography } from "antd";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const Main = ({ user }) => {
  useEffect(() => {}, []);

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} xl={11}>
            <div
              style={{
                backgroundColor: "#ECEBE2",
                padding: "1rem",
                minHeight: "40rem",
              }}
            >
              <Typography>
                <Title level={2}>오늘의 근무</Title>
              </Typography>
            </div>
          </Col>
          <Col xs={24} xl={11}>
            <div
              style={{
                backgroundColor: "#ECEBE2",
                padding: "1rem",
                minHeight: "40rem",
              }}
            >
              <Typography>
                <Title level={2}>내일 근무</Title>
              </Typography>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Main;
