import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  SwapOutlined,
  BarChartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Soldierlist from "./Soldierlist";

const { Sider } = Layout;

const Admin = () => {
  const navigate = useNavigate();

  return (
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
            mode="inline"
            items={[
              {
                key: "1",
                icon: <CalendarOutlined />,
                label: "근무 확인",
                onClick: () => {
                  navigate("/soldier/check-duty");
                },
              },
              {
                key: "2",
                icon: <SwapOutlined />,
                label: "근무 변경",
                onClick: () => {
                  navigate("/soldier/change-duty");
                },
              },
              {
                key: "3",
                icon: <BarChartOutlined />,
                label: "근무 횟수",
                children: [
                  {
                    key: "4",
                    label: "근무 횟수",
                    onClick: () => {
                      navigate("/soldier/check-count");
                    },
                  },
                  {
                    key: "5",
                    label: "근무 추이",
                    onClick: () => {
                      navigate("/soldier/check-count");
                    },
                  },
                  {
                    key: "6",
                    label: "근무 순위",
                    onClick: () => {
                      navigate("/soldier/check-count");
                    },
                  },
                ],
              },
              {
                key: "7",
                icon: <CommentOutlined />,
                label: "건의 사항",
                onClick: () => {
                  navigate("/soldier/reportlist");
                },
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
};

export default Admin;
