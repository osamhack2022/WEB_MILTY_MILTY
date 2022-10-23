import React, { useState, useEffect, useCallback } from "react";
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
import CustomCalendar from "../components/CustomCalendar";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import moment from "moment";

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

const dummyList = [
  {
    label: "a",
    value: "aa",
  },
  {
    label: "b",
    value: "bb"
  },
];

const Changecalendar = () => {
  // const { user } = useAuth();
  // const [data, setData] = useState([]);
  // const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  // const fetchPersonalDuty = useCallback(() => {
  //   axios
  //     .post("/api/get-user-duty-schedule", {
  //       user_pid: user.user_id,
  //       user_division_code: user.user_division_code,
  //     })
  //     .then((response) => {
  //       if (response.status === 200 && response.data.result === "success") {
  //         setData(response.data.schedule);
  //       }
  //     })
  //     .catch((error) => {
  //       console.warn("ERROR : ", error);
  //     });
  // }, [user])

  // const fetchUserList = useCallback(() => {
  //   axios
  //     .post("/api/get-user-list", {
  //       usr_division_code: user.user_division_code,
  //     })
  //     .then((response) => {
  //       // 제대로 작동할지 미지수
  //       // 오류 발생시 아예 response.data.user를 카피하고 작업하는게 나을 듯 합니다
  //       if (response.status === 200 && response.data.result === "success") {
  //         setList(response.data.user.forEach(v => {
  //           v.label = v.user_name;
  //           v.value = v.user_id;
  //         }));
  //       }
  //     })
  //     .catch((error) => {
  //       console.warn("ERROR : ", error);
  //     });
  // }, [user]);

  // useEffect(() => {
  //   fetchPersonalDuty();
  // }, []);

  // api 테스트시 dummyData -> data로 변경
  const getListData = (date) => dummyData.filter((v) => date.isSame(v.date, "day"));

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", {
      request_type: 1,
      request_usr: values.change_target,
      request_reason: values.change_reason,
      request_date: moment().format("YYYY-MM-DD HH:MM:SS"),
    });
    axios
      .post("/api/set-duty-request", {
        request_type: 1,
        request_usr: values.change_target,
        request_reason: values.change_reason,
        request_date: moment().format("YYYY-MM-DD HH:MM:SS"),
      })
      .then((response) => {
        if (response.status === 200) {
          alert("성공적으로 변경이 되었습니다.");
        }
      })
      .catch((error) => {
        console.warn("ERROR : ", error);
      });
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
                  name="change_target"
                  label="변경 대상"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  {/*options =  list 로 변경하면 됩니다.*/}
                  <Select
                    placeholder="근무를 변경할 사람을 선택해 주세요"
                    options={dummyList}
                    allowClear
                  >
                  </Select>
                </Form.Item>
                <Form.Item
                  label="변경 사유"
                  name="change_reason"
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

export default Changecalendar;
