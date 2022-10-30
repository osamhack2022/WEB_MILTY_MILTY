import React, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Space,
  PageHeader,
  Divider,
  Typography,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Drawer,
} from "antd";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import SetDutyTimeslot from "../components/SetDutyTimeslot";

const { Content } = Layout;

const SetDuty = () => {
  const { user } = useAuth();
  const [setDutyForm] = Form.useForm();
  const [duty, setDuty] = useState([]);
  const [selectedDuty, setSelectedDuty] = useState({});
  const [open, setOpen] = useState(false);

  const fetchDuty = useCallback(() => {
    axios
      .post("/api/get-duty", {
        usr_division_code: user.user_division_code,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          setDuty(response.data.duty);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user]);

  useEffect(() => {
    fetchDuty();
  }, []);

  const onSetDutyFinish = (values) => {
    axios
      .post("/api/set-duty", {
        usr_division_code: user.user_division_code,
        duty_name: values.duty_name,
        duty_people_num: values.duty_people_num,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("근무 등록에 성공하였습니다!");
          fetchDuty();
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="장병 일반 근무 설정"
        />
        <div style={{ padding: "1rem", backgroundColor: "#ECEBE2" }}>
          <Typography.Title level={3}>새로운 근무 추가하기</Typography.Title>
          <Form
            form={setDutyForm}
            name="set_duty"
            layout="vertical"
            onFinish={onSetDutyFinish}
            initialValues={{ duty_people_num: 1 }}
            scrollToFirstError
          >
            <Form.Item
              name="duty_name"
              label="근무 이름"
              rules={[
                {
                  type: "string",
                  message: "유효한 근무 이름이 아닙니다!",
                },
                {
                  required: true,
                  message: "근무 이름을 입력해주세요",
                },
              ]}
            >
              <Input placeholder="근무 이름" />
            </Form.Item>

            <Form.Item
              name="duty_people_num"
              label="시간대별 근무 투입 인원수"
              rules={[
                {
                  required: true,
                  message: "근무 투입 인원 수를 선택해주세요",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                formatter={(value) => `${value}명`}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "6px" }}
              >
                근무 추가
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <Typography.Title level={3}>기존 근무 설정하기</Typography.Title>
          <Space>
            <Select
              style={{ width: 120 }}
              placeholder="근무 선택"
              onChange={(value) =>
                setSelectedDuty(duty.find((e) => e.duty_pid === value))
              }
            >
              {duty.map((item) => (
                <Select.Option key={item.duty_pid} value={item.duty_pid}>
                  {item.duty_name}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => setOpen(true)}>
              근무 설정
            </Button>
          </Space>
        </div>
      </Content>

      <Drawer
        title={`${selectedDuty.duty_name} 근무 설정`}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <SetDutyTimeslot duty_pid={selectedDuty.duty_pid} />
      </Drawer>
    </Layout>
  );
};

export default SetDuty;
