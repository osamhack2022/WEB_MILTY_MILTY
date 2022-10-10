import React, { useState } from "react";
import { Layout, Space, PageHeader, Table, Tag, Button } from "antd";

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

const data = [
  {
    key: "1",
    before: {
      class: "일병",
      name: "한동현",
      senior: true,
      tags: ["운전병"],
    },
    after: {
      class: "병장",
      name: "심진우",
      senior: true,
      tags: ["휴가"],
    },
    duty: {
      name: "CCTV",
      startTime: "08:00",
      endTime: "09:00",
    },
    reason: "일병 한동현 운행",
  },
  {
    key: "2",
    before: {
      class: "병장",
      name: "심진우",
      senior: true,
      tags: ["휴가"],
    },
    after: {
      class: "상병",
      name: "최일구",
      senior: true,
      tags: ["분대장", "휴가"],
    },
    duty: {
      name: "무기고",
      startTime: "22:00",
      endTime: "24:00",
    },
    reason: "병장 심진우 휴가",
  },
  {
    key: "3",
    before: {
      class: "상병",
      name: "최일구",
      senior: true,
      tags: ["분대장", "휴가"],
    },
    after: {
      class: "이병",
      name: "박민석",
      senior: false,
      tags: ["환자"],
    },
    duty: {
      name: "무기고",
      startTime: "04:00",
      endTime: "06:00",
    },
    reason: "상병 최일구 휴가",
  },
  {
    key: "4",
    before: {
      class: "이병",
      name: "박민석",
      senior: false,
      tags: ["환자"],
    },
    after: {
      class: "병장",
      name: "심진우",
      senior: true,
      tags: ["휴가"],
    },
    duty: {
      name: "불침번",
      startTime: "22:00",
      endTime: "24:00",
    },
    reason: "이병 박민석 환자",
  },
];

const Request = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingDisapprove, setLoadingDisapprove] = useState(false);

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
            dataSource={data}
            scroll={{ x: 768 }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Request;
