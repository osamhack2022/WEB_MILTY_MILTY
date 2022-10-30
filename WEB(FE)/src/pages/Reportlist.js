import React, { useState, useEffect, useCallback } from "react";
import { Layout, Space, PageHeader, Table, Tag, Button } from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;

const columns = [
  {
    title: "번호",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "내용",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "시간",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "처리 상태",
    key: "status",
    render: (_, { status }) => {
      if (status === 1) return <Tag color="warning">처리중</Tag>;
      if (status === 2) return <Tag color="success">처리 완료</Tag>;
      return <Tag color="error">처리불가</Tag>;
    },
  },
];

const Reportlist = () => {
  const { user } = useAuth();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingDisapprove, setLoadingDisapprove] = useState(false);
  const [report, setReport] = useState();

  const fetchReport = useCallback(() => {
    axios
      .post("/api/admin/get-report", {
        division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setReport(
            response.data.request.map(
              ({ pid, description, time, user_name, status }) => ({
                key: pid,
                index: pid,
                description,
                name: user_name,
                time,
                status,
              })
            )
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchReport();
  }, []);

  const approve = async () => {
    setLoadingApprove(true);

    await Promise.all(
      selectedRowKeys.map((pid) =>
        axios
          .post("/api/admin/set-report", {
            pid,
            status: 2,
          })
          .catch((error) => {
            console.warn(error);
          })
      )
    );

    fetchReport();
    setSelectedRowKeys([]);
    setLoadingApprove(false);
  };

  const disapprove = async () => {
    setLoadingDisapprove(true);

    await Promise.all(
      selectedRowKeys.map((pid) =>
        axios
          .post("/api/admin/set-report", {
            pid,
            status: 0,
          })
          .catch((error) => {
            console.warn(error);
          })
      )
    );

    fetchReport();
    setSelectedRowKeys([]);
    setLoadingDisapprove(false);
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
          title="건의 사항"
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
                선택 항목 처리
              </Button>
              <Button
                type="danger"
                onClick={disapprove}
                disabled={!hasSelected}
                loading={loadingDisapprove}
              >
                선택 항목 거부
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `${selectedRowKeys.length}개 선택됨` : ""}
              </span>
            </Space>
          </div>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (newSelectedRowKeys) =>
                setSelectedRowKeys(newSelectedRowKeys),
            }}
            columns={columns}
            dataSource={report}
            scroll={{ x: 768 }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Reportlist;
