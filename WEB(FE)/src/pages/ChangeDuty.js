import React, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Tag,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  PageHeader,
  Divider,
} from "antd";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CustomCalendar from "../components/CustomCalendar";

const { Content } = Layout;

const schedule = [
  {
    pid: 1,
    date: "2022-10-08",
    name: "무기고",
    startTime: "08:00",
    endTime: "12:00",
  },
  {
    pid: 2,
    date: "2022-10-15",
    name: "위병소",
    startTime: "12:00",
    endTime: "16:00",
  },
  {
    pid: 3,
    date: "2022-10-15",
    name: "CCTV",
    startTime: "20:00",
    endTime: "22:00",
  },
  {
    pid: 4,
    date: "2022-10-17",
    name: "CCTV",
    startTime: "20:00",
    endTime: "22:00",
  },
];

const color = (name) => {
  switch (name) {
    case "CCTV":
      return "green";
    case "무기고":
      return "gold";
    case "불침번":
      return "geekblue";
    case "위병소":
      return "purple";
    case "당직":
      return "magenta";
    default:
      return "default";
  }
};

const ChangeDuty = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  // const [schedule, setSchedule] = useState([]);

  const onFinish = (values) => {
    const { target, reason } = values;

    axios
      .post("/api/user/set-duty-request", {
        request_type: 1,
        duty_schedule_pid: selectedSchedule.pid,
        request_usr: user.user_pid,
        request_change_usr: target,
        request_reason: reason,
        request_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("근무 변경 요청에 성공하였습니다");
          setOpen(false);
          form.resetFields();
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const fetchSoldier = useCallback(() => {
    axios
      .post("/api/get-user-list", {
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setOptions(
            response.data.users.map((user) => ({
              label: `${user.user_class} ${user.user_name}`,
              value: user.user_pid,
            }))
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchSoldier();
  }, []);

  const dateCellRender = useCallback(
    (date) => (
      <div>
        {schedule
          .filter((item) => date.isSame(item.date, "day"))
          .map((item) => (
            <Button
              type="text"
              key={item.pid}
              style={{ padding: "0" }}
              onClick={() => {
                setSelectedSchedule(item);
                setOpen(true);
              }}
            >
              <Tag color={color(item.name)}>{item.name}</Tag>
              <span>
                {item.startTime}-{item.endTime}
              </span>
            </Button>
          ))}
      </div>
    ),
    [schedule]
  );

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{ backgroundColor: "#ECEBE2" }}
          onBack={() => null}
          title="근무 변경"
        />
        <CustomCalendar dateCellRender={dateCellRender} />

        <Drawer
          title="근무 변경"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Tag color={color(selectedSchedule.name)}>
            {selectedSchedule.name}
          </Tag>
          <span>
            {selectedSchedule.date} / {selectedSchedule.startTime}-
            {selectedSchedule.endTime}
          </span>
          <Divider />
          <Form
            name="change-form"
            form={form}
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="target"
              label="변경 대상"
              rules={[
                {
                  required: true,
                  message: "근무를 변경할 사람을 선택해 주세요",
                },
              ]}
            >
              <Select placeholder="근무 변경할 사람 선택" options={options} />
            </Form.Item>
            <Form.Item
              label="변경 사유"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "근무 변경 사유를 작성해주세요",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                변경 요청
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Content>
    </Layout>
  );
};

export default ChangeDuty;
