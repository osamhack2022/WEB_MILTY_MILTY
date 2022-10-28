import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Badge, Button, PageHeader } from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const CheckDuty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);

  const fetchUserDutySchedule = useCallback(() => {
    axios
      .post("/api/user/get-duty-schedule", {
        user_pid: user.user_pid,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setSchedule(
            response.data.schedule.map(
              ({ pid, date, duty_name, start_time, end_time }) => ({
                key: pid,
                index: pid,
                date,
                duty_name,
                start_time,
                end_time,
              })
            )
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {}, []);

  const dateCellRender = useCallback(
    (date) => {
      const data = schedule.filter((item) => date.isSame(item.date, "day"));

      return (
        <div>
          <ul className="events">
            {data.map((item) => (
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
          {data.length === 0 ? null : (
            <Link to={`${date.format("YYYY-MM-DD")}`}>
              <Button href={`${date.format("YYYY-MM-DD")}`}>경작서 확인</Button>
            </Link>
          )}
        </div>
      );
    },
    [schedule]
  );

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{ backgroundColor: "#ECEBE2" }}
          onBack={() => null}
          title="근무 확인"
        />
        <CustomCalendar
          onSelect={(date) => navigate(date.format("YYYY-MM-DD"))}
          dateCellRender={dateCellRender}
        />
      </Content>
    </Layout>
  );
};

export default CheckDuty;
