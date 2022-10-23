import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Badge, Button, PageHeader } from "antd";
import axios from "axios";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const data = [
  {
    key: 1,
    date: "2022-10-08",
    name: "무기고",
    startTime: "08:00",
    endTime: "12:00",
    isDone: true,
    isSigned: true,
  },
  {
    key: 2,
    date: "2022-10-15",
    name: "위병소",
    startTime: "12:00",
    endTime: "16:00",
    isDone: false,
    isSigned: true,
  },
  {
    key: 3,
    date: "2022-10-15",
    name: "CCTV",
    startTime: "20:00",
    endTime: "22:00",
    isDone: false,
    isSigned: false,
  },
  {
    key: 4,
    date: "2022-10-17",
    name: "CCTV",
    startTime: "20:00",
    endTime: "22:00",
    isDone: false,
    isSigned: false,
  },
];

const getListData = (date) => data.filter((v) => date.isSame(v.date, "day"));

const CheckDuty = ({ user }) => {
  useEffect(() => {
    axios.post("/api/get-duty-schedule", {
      user_id: user.user_id,
    });
  }, []);
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div>
        <ul className="events">
          {listData.map((item) => (
            <li key={item.key}>
              <Badge
                style={{}}
                color={(() => {
                  let color;
                  if (item.isDone) color = "green";
                  else if (item.isSigned) color = "geekblue";
                  else color = "red";

                  return color;
                })()}
                text={`${item.name} ${item.startTime}-${item.endTime}`}
              />
            </li>
          ))}
        </ul>
        {listData.length === 0 ? null : (
          <Link to={`dutyprecept/${value.format("YYYY-MM-DD")}`}>
            <Button>경작서 확인</Button>
          </Link>
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
          title="근무 확인"
        />
        <CustomCalendar dateCellRender={dateCellRender} />
      </Content>
    </Layout>
  );
};

export default CheckDuty;
