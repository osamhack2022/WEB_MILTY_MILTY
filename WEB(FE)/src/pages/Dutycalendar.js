import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout, Badge, Button, PageHeader } from "antd";
import CustomCalendar from "../components/CustomCalendar";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;

// 디자인 표기를 위한 더미 데이터
const dummyData = [
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

const Dutycalendar = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  const fetchPersonalDuty = useCallback(() => {
    axios
      .get("/api/get-user-duty-schedule", {
        user_pid: user.user_id,
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setData(response.data.user_duty_list);
        }
      })
      .catch((error) => {
        console.warn("ERROR : ", error);
      });
  }, [user])

  useEffect(() => {
    fetchPersonalDuty();
  }, []);

  // api 테스트시 dummyData -> data로 변경
  const getListData = (date) => dummyData.filter((v) => date.isSame(v.date));

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

export default Dutycalendar;
