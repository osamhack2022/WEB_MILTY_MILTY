import React, { useState, useEffect, useCallback } from "react";
import { Layout, Space, PageHeader, Table, Tag, Button } from "antd";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const columns = [
  {
    title: "계급",
    dataIndex: "before_class",
    key: "before_class",
    render: (_, { before }) => before.class,
  },
  {
    title: "이름",
    dataIndex: "before_name",
    key: "before_name",
    render: (_, { before }) => before.name,
  },
  {
    title: "변경할 근무",
    dataIndex: "duty",
    key: "duty",
    render: (_, { duty }) => {
      let color;
      switch (duty.name) {
        case "CCTV":
          color = "green";
          break;
        case "무기고":
          color = "gold";
          break;
        case "불침번":
          color = "geekblue";
          break;
        case "당직":
          color = "magenta";
          break;
        default:
          color = "default";
      }

      return (
        <>
          <Tag color={color}>{duty.name}</Tag>
          <span>
            {duty.startTime} - {duty.endTime}
          </span>
        </>
      );
    },
  },
  {
    title: "대신 근무 투입할 장병",
    dataIndex: "after",
    key: "after",
    render: (_, { after }) => `${after.class} ${after.name}`,
  },
  {
    title: "변경 사유",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "승인",
    dataIndex: "approve",
    key: "approve",
    render: () => (
      <Space>
        <Button type="primary">승인</Button>
        <Button type="danger">거부</Button>
      </Space>
    ),
  },
];

const Request = () => {
  const { user } = useAuth();
  const [requestList, setRequestList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingDisapprove, setLoadingDisapprove] = useState(false);

  const fetchRequestList = useCallback(() => {
    axios
      .post("/api/admin/get-duty-request", {
        division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setRequestList(
            response.data.request.map(
              (item) => ({
                key: item.pid,
                before: {
                  class: item.before_class,
                  name: item.before_name,
                },
                after: {
                  class: item.after_class,
                  name: item.after_name,
                },
                duty: {
                  name: item.duty_name,
                  startTime: item.start_time,
                  endTime: item.end_time,
                  duty_schedule_pid: item.duty_schedule_pid,
                },
                reason: item.reason,
              })
            )
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      })
  }, [user]);

  useEffect(() => {
    fetchRequestList();
  }, []);

  const approve = () => {
    setLoadingApprove(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingApprove(false);
    }, 1000);
  };

  const disapprove = () => {
    setLoadingDisapprove(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingDisapprove(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log(
      `selectedRowKeys changed: (${selectedRowKeys}) => (${newSelectedRowKeys})`
    );
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="근무 변경 요청 목록"
        />
        <div style={{ padding: "1rem", backgroundColor: "#ECEBE2" }}>
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                type="primary"
                onClick={approve}
                disabled={!hasSelected}
                loading={loadingApprove}
              >
                일괄 승인
              </Button>
              <Button
                type="danger"
                onClick={disapprove}
                disabled={!hasSelected}
                loading={loadingDisapprove}
              >
                일괄 거부
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `${selectedRowKeys.length}명 선택됨` : ""}
              </span>
            </Space>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={requestList}
            scroll={{ x: 768 }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Request;
