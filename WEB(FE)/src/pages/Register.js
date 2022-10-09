import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    /* eslint-disable camelcase */
    const {
      user_name,
      user_id,
      user_password,
      user_birthday,
      user_division,
      user_division_code,
      user_class,
      user_discharge_date,
    } = values;

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name,
        user_id,
        user_password,
        user_birthday,
        user_division,
        user_division_code,
        user_class,
        user_discharge_date,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.warn(error));
  };

  return (
    <div
      className="background"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: window.innerHeight,
        // backgroundImage: "url('http://www.1gan.co.kr/news/photo/201801/140050_92606_65.jpg')",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundColor: "rgba( 123, 132, 80, 0.5 )",
      }}
    >
      <div style={{ maxWidth: "500px", padding: "0.5rem" }}>
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo_crop.png`}
            alt="MILTY 로고"
            style={{ maxWidth: "90%", display: "block", margin: "0 auto" }}
          />
        </Link>
        <Form
          style={{ paddingTop: "1.5rem" }}
          labelCol={{ span: 6 }}
          form={form}
          name="register"
          onFinish={onFinish}
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
                  if (!value || getFieldValue("user_password") === value) {
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

          <Form.Item name="user_class" label="계급">
            <Select values="private">
              <Select.Option value="private">이병/일병</Select.Option>
              <Select.Option value="corporal">상병</Select.Option>
              <Select.Option value="segrent">병장</Select.Option>
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
              Value={moment("2022/01/01", dateFormat)}
              format={dateFormat}
            />
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
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
