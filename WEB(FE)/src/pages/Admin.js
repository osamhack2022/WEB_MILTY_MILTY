import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  EditOutlined,
  ControlOutlined,
  UserOutlined,
  SwapOutlined,
  BarChartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import WriteDuty from "./WriteDuty";
import Exemptlist from "./Exemptlist";
import Soldierlist from "./Soldierlist";
import Request from "./Request";
import Reportlist from "./Reportlist";

const { Sider } = Layout;

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider collapsible collapsedWidth="0" breakpoint="lg" width="18rem">
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
                icon: <EditOutlined />,
                label: "근무 작성",
                onClick: () => {
                  navigate("/admin/write-duty");
                },
              },
              {
                key: "2",
                icon: <ControlOutlined />,
                label: "근무 설정",
                children: [
                  {
                    key: "3",
                    label: "열외자 목록",
                    onClick: () => {
                      navigate("/admin/exemptlist");
                    },
                  },
                  {
                    key: "4",
                    label: "장병 일반 근무 설정",
                    onClick: () => {
                      navigate("/admin/set-duty");
                    },
                  },
                  {
                    key: "5",
                    label: "당직 사령 근무 설정",
                    onClick: () => {
                      navigate("/admin/set-duty");
                    },
                  },
                  {
                    key: "6",
                    label: "당직 / 상황병 근무 설정",
                    onClick: () => {
                      navigate("/admin/set-duty");
                    },
                  },
                  {
                    key: "7",
                    label: "기타 특수근무직 근무 설정",
                    onClick: () => {
                      navigate("/admin/set-duty");
                    },
                  },
                ],
              },
              {
                key: "8",
                icon: <UserOutlined />,
                label: "장병 리스트",
                onClick: () => {
                  navigate("/admin/soldierlist");
                },
              },
              {
                key: "9",
                icon: <SwapOutlined />,
                label: "근무 변경 요청 목록",
                onClick: () => {
                  navigate("/admin/request");
                },
              },
              {
                key: "10",
                icon: <BarChartOutlined />,
                label: "장병 근무 현황",
                onClick: () => {
                  navigate("/admin/check-count");
                },
              },
              {
                key: "11",
                icon: <CommentOutlined />,
                label: "건의 사항",
                onClick: () => {
                  navigate("/admin/reportlist");
                },
              },
            ]}
          />
        </Sider>
        <Routes>
          <Route path="/write-duty" element={<WriteDuty />} />
          <Route path="/exemptlist" element={<Exemptlist />} />
          <Route path="/soldierlist" element={<Soldierlist />} />
          <Route path="/request" element={<Request />} />
          <Route path="/reportlist" element={<Reportlist />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Admin;
