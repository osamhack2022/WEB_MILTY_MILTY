import { UserOutlined } from "@ant-design/icons";
import { Layout, Col, Row, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const Main = () => {
  return (
    <div className="background">
      <Layout className="layout" style={{ height: window.innerHeight }}>
        <Header style={{ height: "70px" }}>
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <div className="logo-crop-small">
                <img
                  src="https://user-images.githubusercontent.com/69956347/192787713-99f639c0-2b12-42a8-a2fa-786493936995.png"
                  className="logo-img"
                />
              </div>
            </Col>
            <Col flex="0 1 425px">
              <div>
                <span style={{ color: "#ECEBE2" }}>
                  홍길동님, 당신의 열정을 응원하겠습니다!
                </span>
                <Link to="/" style={{ marginLeft: "10px" }}>
                  <Button icon={<UserOutlined />}>마이페이지</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <div className="site-layout-content" style={{ margin: "16px 0" }}>
            Content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Milty created by team Milty, in 2022
        </Footer>
      </Layout>
    </div>
  );
};

export default Main;
