import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Col, Row, Typography } from "antd";
import {
  UnorderedListOutlined,
  BarChartOutlined,
  SwapOutlined,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Main = () => (
  <Layout className="layout" style={{ minHeight: window.innerHeight }}>
    <Header>
      <Row justify="space-between">
        <Col>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/logo_crop.png`}
              alt="MILTY 로고"
              style={{
                height: "2.5rem",
              }}
            />
          </Link>
        </Col>
        <Col>
          <Menu
            mode="horizontal"
            theme="dark"
            items={[
              { key: "1", icon: <UnorderedListOutlined />, label: "근무 확인" },
              { key: "2", icon: <BarChartOutlined />, label: "근무 횟수" },
              { key: "3", icon: <SwapOutlined />, label: "근무 변경" },
              { key: "4", icon: <UserOutlined />, label: "마이페이지" },
              { key: "5", icon: <NotificationOutlined />, label: "공지사항" },
            ]}
          />
        </Col>
      </Row>
    </Header>
    <Content
      style={{
        padding: "0.5rem",
      }}
    >
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
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      본인의 개인정보를 절대로 타인에게 넘겨주지 말아야 합니다.
    </Footer>
  </Layout>
);

export default Main;
