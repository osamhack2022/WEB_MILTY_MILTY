import { LeftCircleFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import "./App.css";

const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div
      className="background"
      style={
        {
          display: "flex",
          alignItems: "center",
          height: window.innerHeight,
          backgroundImage: "url('http://www.1gan.co.kr/news/photo/201801/140050_92606_65.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "rgba( 255, 255, 255, 0.5 )",
        }
      }
    >
      <div
        style={
          {
            maxWidth: "300px",
            maxHeight: "290px",
            margin: "auto",
          }
        }
      >
        <div className="logo-crop"
        style={
          {
            position: "relative",
            width: "300px",
            height: "100px",
            overflow: "hidden",
          }
        }>
          <img src="https://user-images.githubusercontent.com/88999549/191758736-7b93192f-78c8-4e2f-8229-b41c2f27aa8e.jpg"
            style={
              {
                position: "absolute",
                top: "-200px",
                left: "-100px",
                width: "500px",
                height: "500px",
              }
            }
          />
        </div>
        <Form
          style={
            {
              margin: "0 auto",
              paddingTop: "10px",
            }
          }
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
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
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
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
