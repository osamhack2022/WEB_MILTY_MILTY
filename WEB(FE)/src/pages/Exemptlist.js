import React, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Space,
  PageHeader,
  Alert,
  Button,
  Drawer,
  Form,
  Select,
  DatePicker,
  Badge,
} from "antd";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const Exemptlist = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [exempt, setExempt] = useState([]);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

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

  const fetchUserList = useCallback(() => {
    axios
      .post("/api/get-user-list", {
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setList(
            response.data.users.map((item) => ({
              label: `${item.user_class} ${item.user_name}`,
              value: item.user_pid,
            }))
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchExempt();
    fetchUserList();
  }, []);

  const onFinish = (values) => {
    axios
      .post("/api/set-user-exempt", values)
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("열외자를 성공적으로 추가하였습니다");
          fetchExempt();
          setOpen(false);
          form.resetFields();
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

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
            action={
              <Button type="primary" onClick={() => setOpen(true)}>
                열외자 추가
              </Button>
            }
            message={
              <Space size="large">
                <span>분류: </span>
                <Badge color="blue" text="휴가" />
                <Badge color="red" text="환자" />
              </Space>
            }
          />
        </div>
        <div>
          <Drawer
            title="열외자 추가"
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
          >
            <Form
              name="addition-form"
              form={form}
              labelCol={{
                span: 6,
              }}
              requiredMark={false}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="user_pid"
                label="열외 대상"
                rules={[
                  {
                    required: true,
                    message: "열외 대상자를 선택해주세요",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="열외 대상자 선택"
                  options={list}
                  filterOption={(input, option) => option.label.includes(input)}
                />
              </Form.Item>

              <Form.Item
                name="exempt_start"
                label="시작일"
                rules={[
                  {
                    required: true,
                    message: "시작일을 선택해 주세요",
                  },
                ]}
              >
                <DatePicker
                  Value={moment("2022-01-01", "YYYY-MM-DD")}
                  format="YYYY-MM-DD"
                  placeholder="열외 시작일"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="exempt_end"
                label="종료일"
                rules={[
                  {
                    required: true,
                    message: "종료일을 선택해 주세요",
                  },
                ]}
              >
                <DatePicker
                  Value={moment("2022-01-01", "YYYY-MM-DD")}
                  format="YYYY-MM-DD"
                  placeholder="열외 종료일"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="exempt_type"
                label="열외 사유"
                rules={[
                  {
                    required: true,
                    message: "열외 사유를 선택해주세요",
                  },
                ]}
              >
                <Select placeholder="열외 사유 선택" allowClear>
                  <Select.Option value="휴가">휴가</Select.Option>
                  <Select.Option value="환자">환자</Select.Option>
                  <Select.Option value="기타">기타</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  열외자 추가
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </div>
        <CustomCalendar dateCellRender={customDateCellRender} />
      </Content>
    </Layout>
  );
};

export default Exemptlist;
