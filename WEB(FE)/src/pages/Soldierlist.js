import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Layout, Space, PageHeader, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;

const columns = [
  {
    title: "계급",
    dataIndex: "class",
    key: "class",
  },
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "전역일",
    dataIndex: "discharge_date",
    key: "discharge_date",
  },
  {
    title: "열외 목록",
    dataIndex: "exempt",
    key: "exempt",
    render: (_, { exempt }) => (
      <>
        {exempt.map((item) => {
          let color;
          switch (item.exempt_type) {
            case "분대장":
              color = "green";
              break;
            case "신병":
              color = "gold";
              break;
            case "운전병":
              color = "geekblue";
              break;
            case "환자":
              color = "magenta";
              break;
            case "휴가":
              color = "red";
              break;
            default:
              color = "default";
          }
          return (
            <Tooltip title={`${item.exempt_start} ~ ${item.exempt_end}`}>
              <Tag color={color} key={item.exempt_pid}>
                {item.exempt_type}
              </Tag>
            </Tooltip>
          );
        })}
      </>
    ),
  },
  {
    title: "추가 작업",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>상세정보 확인하기</a>
        <a>열외 추가하기</a>
      </Space>
    ),
  },
];

const Soldierlist = () => {
  const { user } = useAuth();
  const [soldier, setSoldier] = useState([]);
  const [exempt, setExempt] = useState([]);
  const data = useMemo(
    () =>
      soldier.map(
        ({ user_pid, user_name, user_class, user_discharge_date }) => ({
          key: user_pid,
          name: user_name,
          class: user_class,
          discharge_date: user_discharge_date,
          exempt: exempt.filter((item) => item.usr_pid === user_pid),
        })
      ),
    [soldier, exempt]
  );

  const fetchSoldier = useCallback(() => {
    axios
      .post("/api/get-user-list", {
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setSoldier(response.data.users);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  const fetchExempt = useCallback(() => {
    axios
      .post("/api/get-user-exempt", {
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setExempt(response.data.exempt);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchSoldier();
    fetchExempt();
  }, []);

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="장병 리스트"
        />
        <div style={{ padding: "1rem", backgroundColor: "#ECEBE2" }}>
          <Table columns={columns} dataSource={data} scroll={{ x: 768 }} />
        </div>
      </Content>
    </Layout>
  );
};

export default Soldierlist;
