import React, { useState } from "react";
import { Layout, Space, PageHeader, Table, Tag, Button } from "antd";

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
    title: "사수 / 부사수",
    dataIndex: "senior",
    key: "senior",
    render: (_, { senior }) => (senior ? "사수" : "부사수"),
  },
  {
    title: "분류",
    dataIndex: "tags",
    key: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color;
          switch (tag) {
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
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
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
        <a>정보 수정하기</a>
        <a>근무 확인하기</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    class: "일병",
    name: "한동현",
    senior: true,
    tags: ["운전병"],
  },
  {
    key: "2",
    class: "병장",
    name: "심진우",
    senior: true,
    tags: ["휴가"],
  },
  {
    key: "3",
    class: "상병",
    name: "최일구",
    senior: true,
    tags: ["분대장", "휴가"],
  },
  {
    key: "4",
    class: "이병",
    name: "박민석",
    senior: false,
    tags: ["환자"],
  },
];

const Soldierlist = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingPromote, setLoadingPromote] = useState(false);
  const [loadingAddTag, setLoadingAddTag] = useState(false);
  const [loadingRemoveTag, setLoadingRemoveTag] = useState(false);

  const promote = () => {
    setLoadingPromote(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingPromote(false);
    }, 1000);
  };

  const addTag = () => {
    setLoadingAddTag(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingAddTag(false);
    }, 1000);
  };

  const removeTag = () => {
    setLoadingRemoveTag(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoadingRemoveTag(false);
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
          title="장병 리스트"
        />
        <div style={{ padding: "1rem", backgroundColor: "#ECEBE2" }}>
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                type="primary"
                onClick={promote}
                disabled={!hasSelected}
                loading={loadingPromote}
              >
                진급
              </Button>
              <Button
                type="primary"
                onClick={addTag}
                disabled={!hasSelected}
                loading={loadingAddTag}
              >
                분류 추가
              </Button>
              <Button
                type="danger"
                onClick={removeTag}
                disabled={!hasSelected}
                loading={loadingRemoveTag}
              >
                분류 삭제
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
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Soldierlist;
