import React from "react";
import { Layout, Space, PageHeader, Alert, Badge } from "antd";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const data = [
  {
    key: 1,
    user: {
      class: "일병",
      name: "한동현",
      senior: true,
      tags: ["운전병"],
    },
    date: "2022-10-08",
    type: "휴가",
  },
  {
    key: 2,
    user: {
      class: "이병",
      name: "박민석",
      senior: false,
      tags: ["환자"],
    },
    date: "2022-10-15",
    type: "환자",
  },
  {
    key: 3,
    user: {
      class: "이병",
      name: "박민석",
      senior: false,
      tags: ["환자"],
    },
    date: "2022-10-16",
    type: "환자",
  },
  {
    key: 4,
    user: {
      class: "이병",
      name: "박민석",
      senior: false,
      tags: ["환자"],
    },
    date: "2022-10-17",
    type: "환자",
  },
  {
    key: 5,
    user: {
      class: "일병",
      name: "한동현",
      senior: true,
      tags: ["운전병"],
    },
    date: "2022-10-17",
    type: "운행",
  },
];

const getListData = (date) => data.filter((v) => date.isSame(v.date, "day"));

const Exemptlist = () => {
  const customDateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.key}>
            <Badge
              style={{}}
              color={(() => {
                let color;
                switch (item.type) {
                  case "휴가":
                    color = "blue";
                    break;
                  case "환자":
                    color = "red";
                    break;
                  default:
                    color = "lime";
                }

                return color;
              })()}
              text={`${item.user.class} ${item.user.name} - ${item.type}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{ backgroundColor: "#ECEBE2" }}
          onBack={() => null}
          title="열외자 목록"
        />
        <div style={{ padding: "0rem 1rem", backgroundColor: "#ECEBE2" }}>
          <Alert
            message={
              <Space size="large">
                <span>분류: </span>
                <Badge color="blue" text="휴가" />
                <Badge color="red" text="환자" />
              </Space>
            }
          />
        </div>
        <CustomCalendar dateCellRender={customDateCellRender} />
      </Content>
    </Layout>
  );
};

export default Exemptlist;
