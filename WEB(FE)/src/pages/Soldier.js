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
import { useAuth } from "../hooks/useAuth";
import Main from "./Main";
import CheckDuty from "./CheckDuty";
import CheckDutyPrecept from "./CheckDutyPrecept";
import ChangeDuty from "./ChangeDuty";
import Dutycount from "./Dutycount";
import Dutygraph from "./Dutygraph";
import Report from "./Report";
import Mypage from "./Mypage";

const { Sider } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
                onClick: () => {
                  logout();
                },
              },
            ]}
          />
        </Sider>
        <Routes>
          <Route index element={<Main user={user} />} />
          <Route path="/check-duty" element={<CheckDuty />} />
          <Route path="/check-duty/:date" element={<CheckDutyPrecept />} />
          <Route path="/change-duty" element={<ChangeDuty />} />
          <Route path="/check-count/count" element={<Dutycount />} />
          <Route path="/check-count/graph" element={<Dutygraph />} />
          <Route path="/check-count/ranking" />
          <Route path="/report" element={<Report />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Admin;
