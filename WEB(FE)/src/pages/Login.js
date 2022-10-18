import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = ({ user_id, user_password }) => {
    axios
      .post("/api/login", {
        user_id,
        user_password,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          const { user } = response.data;

          sessionStorage.setItem("user_id", user.user_id);
          sessionStorage.setItem("user_name", user.user_name);
          sessionStorage.setItem("user_birthday", user.user_birthday);
          sessionStorage.setItem("user_class", user.user_class);
          sessionStorage.setItem("user_division", user.user_division);
          sessionStorage.setItem("user_division_code", user.user_division_code);

          navigate("/soldier");
        }
      })
      .catch((error) => {
        console.warn("ERROR : ", error);
        if (error.response.status === 401) alert("잘못된 로그인");
      });
  };

  return (
    <div
      className="background"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: window.innerHeight,
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
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user_id"
            rules={[
              {
                required: true,
                message: "아이디(군번)를 입력하세요!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="사용자 아이디 (군번)"
            />
          </Form.Item>
          <Form.Item
            name="user_password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력하세요!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="비밀번호"
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
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              로그인
            </Button>
            <Link to="/register">
              <div style={{ marginTop: "12px" }}>신규등록</div>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
