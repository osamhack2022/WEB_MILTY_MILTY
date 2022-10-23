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
  Input,
  Badge
} from "antd";
import CustomCalendar from "../components/CustomCalendar";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const dateFormat = "YYYY/MM/DD";

const { Content } = Layout;

// 디자인 표기를 위한 더미 데이터
const dummyData = [
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

const Exemptlist = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
    axios
      .post("/api/register", values)
      .then((response) => {
        if (response.status === 200) {
          alert("성공적으로 추가 되었습니다.");
        }
      })
      .catch((error) => {
        console.warn("ERROR : ", error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchExemptData = useCallback(() => {
    axios
      .get("/api/get-user-exempt", {
        user_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setData(response.data.exempt);
        }
      })
      .catch((error) => {
        console.warn("ERROR : ", error);
      });
  }, [user])

  useEffect(() => {
    fetchExemptData();
  }, []);

  const getListData = (date) =>
    data.filter((v) => date.isBetween(v.exemp_start, exemp_end, undefined, "[]"));

  const customDateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.exempt_pid}>
            <Badge
              style={{}}
              color={(() => {
                let color;
                switch (item.exempt_type) {
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
              text={`${item.user_name} - ${item.exampt_type}`}
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
        <div style={{ padding: "0.3rem 1rem", backgroundColor: "#ECEBE2" }}>
          <Button
            type="primary"
            onClick={showDrawer}
          >
            열외자 추가
          </Button>
        </div>
        <div>
          <Drawer
            title="열외자 추가"
            placement="right"
            size="large"
            onClose={onClose}
            open={open}
          >
            <Form
              name="addition-form"
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
                name="user_pid"
                label="추가 대상"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="열외자에 추가할 사람을 선택해 주세요"
                  allowClear
                >
                  <Select.Option value="a">a</Select.Option>
                  <Select.Option value="b">b</Select.Option>
                  <Select.Option value="c">c</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="user_division_code"
                label="부대코드"
                rules={[
                  {
                    type: "string",
                    message: "올바른 부대코드를 입력해 주세요",
                  },
                  {
                    required: true,
                    message: "부대코드를 입력해 주세요",
                  },
                ]}
              >
                <Input placeholder="부대코드" />
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
                  Value={moment("2022/01/01", dateFormat)}
                  format={dateFormat}
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
                  Value={moment("2022/01/01", dateFormat)}
                  format={dateFormat}
                />
              </Form.Item>

              <Form.Item
                name="exempt_type"
                label="열외 사유"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="열외 사유를 선택해 주세요"
                  allowClear
                >
                  <Select.Option value="a">a</Select.Option>
                  <Select.Option value="b">b</Select.Option>
                  <Select.Option value="c">c</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  추가 완료
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
