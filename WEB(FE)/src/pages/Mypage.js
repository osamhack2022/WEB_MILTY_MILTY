import React from "react";
import {
  Layout,
  PageHeader,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
} from "antd";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;

const Mypage = () => {
  const { user } = useAuth();

  const onFinish = (values) => {
    console.log(values);
    axios
      // 관련 API가 없어서 일단 공란으로 유지
      .post("/api/set-user-info", { ...values, user_pid: user.user_pid })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          alert("사용자 정보가 성공적으로 수정이 되었습니다.");
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
          title="마이 페이지"
        />
        <div
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
            padding: "1rem",
          }}
        >
          <Row justify="space-around">
            <Col span={12}>
              <Form
                style={{ paddingTop: "1.5rem" }}
                labelCol={{ span: 6 }}
                name="mypage"
                onFinish={onFinish}
                initialValues={{
                  ...user,
                  user_discharge_date: moment(user.user_discharge_date),
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="user_name"
                  label="이름"
                  rules={[
                    {
                      type: "string",
                      message: "유효한 이름이 아닙니다!",
                    },
                    {
                      required: true,
                      message: "이름을 입력해주세요",
                    },
                  ]}
                >
                  <Input placeholder="이름" />
                </Form.Item>
                <Form.Item
                  name="user_id"
                  label="군번"
                  rules={[
                    {
                      type: "string",
                      message: "유효한 군번이 아닙니다!",
                    },
                    {
                      required: true,
                      message: "군번을 입력해주세요",
                    },
                  ]}
                >
                  <Input placeholder="군번" />
                </Form.Item>

                <Form.Item
                  name="user_password"
                  label="비밀번호"
                  rules={[
                    {
                      required: true,
                      message: "비밀번호를 입력해 주세요",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="비밀번호" />
                </Form.Item>

                <Form.Item
                  name="user_confirm"
                  label="비밀번호 확인"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "비밀번호를 확인해 주세요",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("user_password") === value
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("비밀번호가 일치하지 않습니다")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="비밀번호 확인" />
                </Form.Item>

                <Form.Item
                  name="user_birthday"
                  label="생년월일"
                  rules={[
                    {
                      type: "string",
                      message: "올바른 생년월일을 입력해 주세요",
                    },
                    {
                      required: true,
                      message: "생년월일을 입력해 주세요",
                    },
                  ]}
                >
                  <Input placeholder="주민등록번호 앞 6자리를 입력해 주세요" />
                </Form.Item>

                <Form.Item
                  name="user_division"
                  label="소속부대"
                  rules={[
                    {
                      type: "string",
                      message: "올바른 부대명을 입력해 주세요",
                    },
                    {
                      required: true,
                      message: "부대명을 입력해 주세요",
                    },
                  ]}
                >
                  <Input placeholder="중대 단위까지 입력해 주세요" />
                </Form.Item>

                <Form.Item
                  name="user_division_code"
                  label="부대코드"
                  rules={[
                    {
                      type: "number",
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

                <Form.Item name="user_class" label="계급">
                  <Select values="private">
                    <Select.Option value="이병">이병</Select.Option>
                    <Select.Option value="일병">일병</Select.Option>
                    <Select.Option value="상병">상병</Select.Option>
                    <Select.Option value="병장">병장</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="user_discharge_date"
                  label="전역일"
                  rules={[
                    {
                      required: true,
                      message: "전역일을 선택해 주세요",
                    },
                  ]}
                >
                  <DatePicker
                    Value={moment("2022-01-01", "YYYY-MM-DD")}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{ xs: { offset: 0 }, sm: { offset: 6 } }}
                  name="checked"
                  valuePropName="checked"
                >
                  <Checkbox disabled>관리자 여부</Checkbox>
                </Form.Item>

                <Form.Item
                  style={{ marginTop: "1rem" }}
                  wrapperCol={{ xs: { offset: 0 }, sm: { offset: 6 } }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "6px" }}
                  >
                    정보 수정
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Mypage;
