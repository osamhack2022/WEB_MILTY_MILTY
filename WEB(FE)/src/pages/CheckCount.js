import { Layout, PageHeader, DatePicker, Space, Row, Col } from "antd";
import React from "react";

const { Content } = Layout;
const { RangePicker } = DatePicker;

const CheckCount = () => (
  <Layout>
    <Content style={{ padding: "1rem" }}>
      <PageHeader
        style={{
          backgroundColor: "#ECEBE2",
        }}
        onBack={() => null}
        title="근무 통계"
      />
      <div
        style={{
          border: "1px solid rgb(235, 237, 240)",
          backgroundColor: "#ECEBE2",
          padding: "1rem",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          홍길동 님은 다른 전우들과 근무를 <span>"비슷하게"</span> 들어갔네요!
        </div>
        <Space style={{ marginBottom: "10px" }}>
          <RangePicker />
          동안 근무 횟수:
          <span>n회</span>
        </Space>
        <Row
          justify="space-around"
          style={{ minHeight: "300px", marginBottom: "10px" }}
        >
          <Col flex="0 1 300px">
            <div style={{ height: "100%", backgroundColor: "#D2D2CA" }}>
              위병소
            </div>
          </Col>
          <Col flex="0 1 300px">
            <div style={{ height: "100%", backgroundColor: "#D2D2CA" }}>
              cctv
            </div>
          </Col>
          <Col flex="0 1 300px">
            <div style={{ height: "100%", backgroundColor: "#D2D2CA" }}>
              불침번
            </div>
          </Col>
        </Row>
        <div>
          18~20시 근무 투입 횟수: <span>n회</span>
        </div>
      </div>
    </Content>
  </Layout>
);

export default CheckCount;
