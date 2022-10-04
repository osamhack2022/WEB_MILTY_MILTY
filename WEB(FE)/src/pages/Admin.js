import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  EditOutlined,
  ControlOutlined,
  UserOutlined,
  SwapOutlined,
  BarChartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Soldierlist from "./Soldierlist";

const { Sider } = Layout;

const Admin = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Layout>
      <Sider width="18rem">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo_crop.png`}
            alt="MILTY 로고"
            style={{
              maxWidth: "80%",
              display: "block",
              margin: "3rem auto",
            }}
          />
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={["3"]}
          items={[
            {
              key: "1",
              icon: <EditOutlined />,
              label: "근무 작성",
            },
            {
              key: "2",
              icon: <ControlOutlined />,
              label: "근무 설정",
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: "장병 리스트",
            },
            {
              key: "4",
              icon: <SwapOutlined />,
              label: "근무 변경 요청 목록",
            },
            {
              key: "5",
              icon: <BarChartOutlined />,
              label: "장병 근무 현황",
            },
            {
              key: "6",
              icon: <CommentOutlined />,
              label: "건의 사항",
            },
          ]}
        />
      </Sider>
      <Routes>
        <Route path="/soldierlist" element={<Soldierlist />} />
      </Routes>
    </Layout>
  </Layout>
);

export default Admin;
