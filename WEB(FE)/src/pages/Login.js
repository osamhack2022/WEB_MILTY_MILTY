import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
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
        // backgroundColor: "rgba( 210, 210, 202, 1.0)",
      }}
    >
      <div
        style={{
          maxWidth: "300px",
          maxHeight: "290px",
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
          }}
        >
          <img
            src="https://user-images.githubusercontent.com/69956347/192787713-99f639c0-2b12-42a8-a2fa-786493936995.png"
            alt="MILTY 로고"
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
          style={{
            margin: "0 auto",
            paddingTop: "10px",
          }}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>로그인 저장</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/password-reset">
              PW 초기화
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
            <Link to="/register">
              <div
                style={{
                  marginTop: "5px",
                }}
              >
                신규등록
              </div>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
