import React from "react";
import { Layout, Button, PageHeader } from "antd";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const data = [
  {
    date: "2022-10-08",
    isWritten: true,
  },
  {
    date: "2022-10-15",
    isWritten: true,
  },
  {
    date: "2022-10-16",
    isWritten: true,
  },
  {
    date: "2022-10-17",
    isWritten: false,
  },
];

const getListData = (date) => data.filter((v) => date.isSame(v.date, "day"));

const WriteDuty = () => {
  const customDateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {listData.length !== 0 && listData[0].isWritten ? (
          <Button size="small">경작서 확인</Button>
        ) : (
          <Button size="small" type="primary">
            경작서 작성
          </Button>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{ backgroundColor: "#ECEBE2" }}
          onBack={() => null}
          title="근무 작성"
        />
        <CustomCalendar dateCellRender={customDateCellRender} />
      </Content>
    </Layout>
  );
};

export default WriteDuty;
