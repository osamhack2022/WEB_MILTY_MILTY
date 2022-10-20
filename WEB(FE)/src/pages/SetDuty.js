import React from "react";
import {
  Layout,
  Space,
  PageHeader,
  Divider,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

const SetDuty = ({ user }) => {
  const [setDutyForm] = Form.useForm();
  const [setTimeslotForm] = Form.useForm();

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
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const onSetTimeslotFinish = (values) => {
    console.log(values);
    axios
      .post("/api/set-duty-timeslot", values)
      .then((response) => {
        if (response.status === 200) {
          alert("성공적으로 근무가 추가되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
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
            name="set-duty"
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
                max={3}
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

          <Typography.Title
            level={3}
            editable={{
              tooltip: "근무 이름 수정하기",
            }}
          >
            CCTV
          </Typography.Title>
          <Form
            form={setTimeslotForm}
            name="set-timeslot"
            layout="vertical"
            onFinish={onSetTimeslotFinish}
            scrollToFirstError
          >
            <Form.List name="timeslot">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 12,
                      }}
                      align="center"
                    >
                      <Input.Group compact>
                        <Form.Item
                          {...restField}
                          name={[name, "start-time"]}
                          rules={[
                            {
                              required: true,
                              message: "",
                            },
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input
                            className="site-input-left"
                            placeholder="시작 시간"
                            style={{ textAlign: "center", width: "6rem" }}
                          />
                        </Form.Item>
                        <Input
                          className="site-input-split"
                          style={{ width: 30 }}
                          placeholder="~"
                          disabled
                        />
                        <Form.Item
                          {...restField}
                          name={[name, "end-time"]}
                          rules={[
                            {
                              required: true,
                              message: "",
                            },
                          ]}
                          style={{ marginBottom: "0px" }}
                        >
                          <Input
                            className="site-input-right"
                            placeholder="끝 시간"
                            style={{ textAlign: "center", width: "6rem" }}
                          />
                        </Form.Item>
                      </Input.Group>

                      <Form.Item
                        {...restField}
                        name={[name, "point"]}
                        rules={[
                          {
                            required: true,
                            message: "",
                          },
                        ]}
                        style={{ marginBottom: "0px" }}
                      >
                        <InputNumber
                          defaultValue={1}
                          step={0.5}
                          formatter={(value) => `${value}점`}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      근무 시간대 추가
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "6px" }}
              >
                저장
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default SetDuty;
