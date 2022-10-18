import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  SwapOutlined,
  BarChartOutlined,
  CommentOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Dutycalender from "./Dutycalendar";
import Dutyprecept from "./Dutyprecept";
import Changecalendar from "./Changecalendar";
import Dutycount from "./Dutycount";
import Dutygraph from "./Dutygraph";
import Report from "./Report";

const { Sider } = Layout;

const Admin = ({ user }) => {
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
                      navigate("/soldier/check-count/count");
                    },
                  },
                  {
                    key: "5",
                    label: "근무 추이",
                    onClick: () => {
                      navigate("/soldier/check-count/graph");
                    },
                  },
                  {
                    key: "6",
                    label: "근무 순위",
                    onClick: () => {
                      navigate("/soldier/check-count/ranking");
                    },
                  },
                ],
              },
              {
                key: "7",
                icon: <CommentOutlined />,
                label: "건의 사항",
                onClick: () => {
                  navigate("/soldier/report");
                },
              },
              {
                key: "8",
                icon: <UserOutlined />,
                label: "마이 페이지",
                onClick: () => {
                  navigate("/soldier/mypage");
                },
              },
              {
                key: "9",
                icon: <LogoutOutlined />,
                label: "로그아웃",
                onClick: () => {},
              },
            ]}
          />
        </Sider>
        <Routes>
          <Route path="/check-duty" element={<Dutycalender />} />
          <Route path="/check-duty/dutyprecept/:date" element={<Dutyprecept />} />
          <Route path="/change-duty" element={<Changecalendar />} />
          <Route path="/check-count/count" element={<Dutycount />} />
          <Route path="/check-count/graph" element={<Dutygraph />} />
          <Route path="/check-count/ranking" element={<Dutycalender />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Admin;
