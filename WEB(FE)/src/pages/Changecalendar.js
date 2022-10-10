import {
  Layout,
  Badge,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  PageHeader,
  Calendar
} from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

const { Content } = Layout;

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          startTime: "08:00",
          endTime: "12:00",
          isDone: true,
          isSigned: true,
        },
      ];
      break;

    case 15:
      listData = [
        {
          startTime: "12:00",
          endTime: "16:00",
          isDone: false,
          isSigned: true,
        },
        {
          startTime: "20:00",
          endTime: "22:00",
          isDone: false,
          isSigned: false,
        },
      ];
      break;

    default:
  }

  return listData || [];
};

const Changecalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div style={{ overflow: "hidden" }}>
        <ul className="events" style={{ margin: "0", padding: "0", listStyle: "none", }}>
          {listData.map((item) => (
            <li key={(item.startTime + "-" + item.endTime)} style={{ maxHeight: "22px" }}>
              <Badge
                style={{
                  width: "100%",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                status={item.isDone ? "success" : (item.isSigned ? "warning" : "error")}
                text={(item.startTime + "-" + item.endTime)}
              />
            </li>
          ))}
        </ul>
        {(listData.length === 0 ? (<div></div>) :
          (
            <div>
              <Button onClick={showDrawer}>근무 변경</Button>
              <Drawer title="근무 변경" placement="right" size="large" onClose={onClose} open={open}>
                <Form
                  name="change-form"
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="change-target"
                    label="변경 대상"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="근무를 변경할 사람을 선택해 주세요"
                      allowClear
                    >
                      <Select.Option value="a">a</Select.Option>
                      <Select.Option value="b">b</Select.Option>
                      <Select.Option value="c">c</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="변경 사유"
                    name="change-reason"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 4,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      변경 요청
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title="근무 변경"
        />
        <Calendar
          defaultValue={moment()}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
          mode={"month"}
          style={{ padding: "0.5rem" }}
        />
      </Content>
    </Layout>
  );
};

export default Changecalendar;
