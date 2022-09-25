import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import 'antd/dist/antd.css';

const Login = () => {
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
          // backgroundImage: "url('http://www.1gan.co.kr/news/photo/201801/140050_92606_65.jpg')",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          backgroundColor: "rgba( 123, 132, 80, 0.5 )",
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
              <Checkbox>로그인 저장</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              PW 초기화
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
            <a href="">신규등록</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
