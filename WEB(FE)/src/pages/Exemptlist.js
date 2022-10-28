import React, { useState, useEffect, useCallback } from "react";
import { Layout, Space, PageHeader, Alert, Badge } from "antd";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const Exemptlist = () => {
  const { user } = useAuth();
  const [exempt, setExempt] = useState([]);

  const fetchExempt = useCallback(() => {
    axios
      .post("/api/get-user-exempt", {
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setExempt(
            response.data.exempt.map(
              ({
                exempt_pid,
                exempt_start,
                exempt_end,
                user_name,
                exempt_type,
              }) => ({
                key: exempt_pid,
                index: exempt_pid,
                name: user_name,
                start_date: moment(exempt_start),
                end_date: moment(exempt_end),
                type: exempt_type,
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
    fetchExempt();
  }, []);

  const customDateCellRender = useCallback(
    (date) => {
      const data = exempt.filter((item) =>
        date.isBetween(item.start_date, item.end_date, "days", "[]")
      );

      return (
        <ul className="events">
          {data.map((item) => (
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
                text={`${item.name} - ${item.type}`}
              />
            </li>
          ))}
        </ul>
      );
    },
    [exempt]
  );

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
