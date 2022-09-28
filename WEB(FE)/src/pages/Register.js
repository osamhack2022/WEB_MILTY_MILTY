import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  DatePicker,
} from "antd";
import React from "react";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div
      className="background"
      style={{
        display: "flex",
        alignItems: "center",
        height: window.innerHeight,
        // backgroundImage: "url('http://www.1gan.co.kr/news/photo/201801/140050_92606_65.jpg')",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundColor: "rgba( 123, 132, 80, 0.5 )",
      }}
    >
      <div
        style={{
          minWidth: "600px",
          margin: "auto",
        }}
      >
        <div
          className="logo-crop"
          style={{
            position: "relative",
            width: "300px",
            height: "110px",
            overflow: "hidden",
            margin: "10px auto",
          }}
        >
          <img
            src="https://user-images.githubusercontent.com/69956347/192787713-99f639c0-2b12-42a8-a2fa-786493936995.png"
            style={{
              position: "absolute",
              top: "-100px",
              left: "0px",
              width: "300px",
              height: "300px",
            }}
          />
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
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
            name="service_number"
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
            name="password"
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
            name="confirm"
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
                  if (!value || getFieldValue("password") === value) {
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
            name="birthday"
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
            name="division"
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
            name="division_code"
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

          <Form.Item name="class" label="계급">
            <Select values="private">
              <Select.Option value="private">이병/일병</Select.Option>
              <Select.Option value="corporal">상병</Select.Option>
              <Select.Option value="segrent">병장</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="discharge_date"
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

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginLeft: "-90px",
              }}
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
