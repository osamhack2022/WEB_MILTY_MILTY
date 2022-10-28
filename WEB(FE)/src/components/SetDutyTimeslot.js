import React, { useEffect, useCallback } from "react";
import { Space, Form, Input, InputNumber, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const SetDutyTimeslot = ({ duty_pid }) => {
  const [form] = Form.useForm();

  const fetchTimeslot = useCallback(() => {
    axios
      .post("/api/get-duty-timeslot", { duty_pid })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          form.setFieldsValue({
            timeslot: response.data.timeslot.map(
              ({ timeslot_start, timeslot_end, timeslot_point }) => ({
                start_time: timeslot_start,
                end_time: timeslot_end,
                point: timeslot_point,
              })
            ),
          });
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [duty_pid]);

  useEffect(() => {
    fetchTimeslot();
  }, [duty_pid]);

  const onSetTimeslotFinish = (values) => {
    axios
      .post("/api/set-duty-timeslot", {
        duty_pid,
        timeslot: values.timeslot.map(({ start_time, end_time, point }) => ({
          timeslot_start: start_time,
          timeslot_end: end_time,
          timeslot_point: point,
        })),
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("성공적으로 근무가 설정되었습니다.");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <Form
      name="set_timeslot"
      layout="vertical"
      form={form}
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
                    name={[name, "start_time"]}
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
                    name={[name, "end_time"]}
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
                    step={0.5}
                    formatter={(value) => `${value}점`}
                    style={{ width: "4.5rem" }}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add({ point: 1 });
                }}
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
        <Button type="primary" htmlType="submit" style={{ marginTop: "6px" }}>
          저장
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SetDutyTimeslot;
