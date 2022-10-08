import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Main = () => {
  const navigate = useNavigate();

  return (
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
                {
                  key: "1",
                  icon: <UnorderedListOutlined />,
                  label: "근무 확인",
                  onClick: () => {
                    navigate("/check-duty");
                  },
                },
                {
                  key: "2",
                  icon: <BarChartOutlined />,
                  label: "근무 횟수",
                  onClick: () => {
                    navigate("/check-count");
                  },
                },
                {
                  key: "3",
                  icon: <SwapOutlined />,
                  label: "근무 변경",
                  onClick: () => {
                    navigate("/change-duty");
                  },
                },
                {
                  key: "4",
                  icon: <UserOutlined />,
                  label: "마이페이지",
                  onClick: () => {
                    navigate("/mypage");
                  },
                },
                {
                  key: "5",
                  icon: <NotificationOutlined />,
                  label: "건의사항",
                  onClick: () => {
                    navigate("/report");
                  },
                },
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
};

export default Main;
