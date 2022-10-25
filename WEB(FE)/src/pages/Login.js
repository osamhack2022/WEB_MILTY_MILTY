import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const onFinish = ({ user_id, user_password }) => {
    axios
      .post("/api/login", {
        user_id,
        user_password,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result === "success") {
          const { user, token } = response.data;
          // 로그인과 동시에 token이 발급되며 header를 통해 토큰 값이 전달됩니다.
          user.token = token;
          sessionStorage.setItem('access_token', token);
          axios.defaults.headers.common.Authorization = token;
          login(user);
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
            <Button
              block
              style={{ marginTop: "0.5rem" }}
              type="primary"
              htmlType="submit"
            >
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
