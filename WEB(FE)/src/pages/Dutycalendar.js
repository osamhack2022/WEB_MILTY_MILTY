import { Layout, Badge, Button, PageHeader, Calendar } from 'antd';
import React from 'react';
import moment from 'moment';

const { Content } = Layout;

const getListData = (value) => {
  let listData;
  // 예시 정보
  switch (value.date()) {
    case 8:
      listData = [
        {
          startTime: "08:00",
          endTime: "12:00",
          isDone: true,
          isSigned: true,
        },
      ];
      break;

    case 15:
      listData = [
        {
          startTime: "12:00",
          endTime: "16:00",
          isDone: false,
          isSigned: true,
        },
        {
          startTime: "20:00",
          endTime: "22:00",
          isDone: false,
          isSigned: false,
        },
      ];
      break;

    default:
  }

  return listData || [];
};

const Dutycalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div style={{ overflow: "hidden" }}>
        <ul className="events" style={{ margin: "0", padding: "0", listStyle: "none", }}>
          {listData.map((item) => (
            <li key={(item.startTime + "-" + item.endTime)} style={{ maxHeight: "22px" }}>
              <Badge
                style={{
                  width: "100%",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                status={item.isDone ? "success" : (item.isSigned ? "warning" : "error")}
                text={(item.startTime + "-" + item.endTime)}
              />
            </li>
          ))}
        </ul>
        {(listData.length === 0 ? (<div></div>) : (<Button>경작서 확인</Button>))}
      </div>
    );
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="근무 확인"
        />
        <Calendar
          defaultValue={moment()}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
          mode={"month"}
          style={{ padding: "0.5rem" }}
        />
      </Content>
    </Layout>
  );
};

export default Dutycalendar;