import React, { useState } from "react";
import { Layout, Space, PageHeader, Table, Tag, Button } from "antd";

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
    render: (_, { status }) =>
      status ? (
        <Tag color="success">처리 완료</Tag>
      ) : (
        <Tag color="warning">처리중</Tag>
      ),
  },
];

const data = [
  {
    key: 1,
    index: 1,
    description: "운전병 장거리 배차 전날에는 야간 근무를 넣지 말아주세요.",
    name: "일병 한동현",
    time: "2022-10-01 00:00",
    status: false,
  },
  {
    key: 2,
    index: 2,
    description: "사이트에 오류가 많습니다. 해결해주세요.",
    name: "익명",
    time: "2022-10-09 12:03",
    status: true,
  },
  {
    key: 3,
    index: 3,
    description: "요즘들어 밥이 너무 맛이 없습니다.",
    name: "익명",
    time: "2022-10-09 12:13",
    status: false,
  },
];

const Reportlist = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingApprove, setLoadingApprove] = useState(false);

  const approve = () => {
    setLoadingApprove(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingApprove(false);
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
            border: "1px solid rgb(235, 237, 240)",
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
                일괄 처리
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `${selectedRowKeys.length}개 선택됨` : ""}
              </span>
            </Space>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Reportlist;
