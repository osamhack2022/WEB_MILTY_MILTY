import {
  Layout,
  Badge,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  PageHeader,
} from "antd";
import React, { useState } from "react";
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

const ChangeDuty = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        {listData.length === 0 ? (
          <div />
        ) : (
          <div>
            <Button onClick={showDrawer}>근무 변경</Button>
            <Drawer
              title="근무 변경"
              placement="right"
              size="large"
              onClose={onClose}
              open={open}
            >
              <Form
                name="change-form"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="change-target"
                  label="변경 대상"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="근무를 변경할 사람을 선택해 주세요"
                    allowClear
                  >
                    <Select.Option value="a">a</Select.Option>
                    <Select.Option value="b">b</Select.Option>
                    <Select.Option value="c">c</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="변경 사유"
                  name="change-reason"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 4,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    변경 요청
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </div>
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
          title="근무 변경"
        />
        <CustomCalendar dateCellRender={dateCellRender} />
      </Content>
    </Layout>
  );
};

export default ChangeDuty;
