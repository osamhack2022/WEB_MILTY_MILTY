import React from "react";
import { Table, Row, Col, Typography } from "antd";
import {
  topTableColumns,
  topTabledata,
  middleTableColumns,
  middleTabledata,
  bottomTableColumns,
  bottomTabledata,
} from "./preceptdata";

const Precept = () => (
  <div
    style={{
      backgroundColor: "#ECEBE2",
      padding: "1rem",
    }}
  >
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} xl={22}>
        <Typography.Title level={3}>지휘통제실</Typography.Title>
        <Table
          columns={topTableColumns}
          dataSource={topTabledata}
          pagination={{ position: ["none", "none"] }}
        />
      </Col>
      <Col xs={24} xl={11}>
        <Typography.Title level={3}>탄약고</Typography.Title>
        <Table
          columns={middleTableColumns}
          dataSource={middleTabledata}
          pagination={{ position: ["none", "none"] }}
        />
      </Col>
      <Col xs={24} xl={11}>
        <Typography.Title level={3}>CCTV</Typography.Title>
        <Table
          columns={middleTableColumns}
          dataSource={middleTabledata}
          pagination={{ position: ["none", "none"] }}
        />
      </Col>
      <Col xs={24} xl={22}>
        <Typography.Title level={3}>불침번</Typography.Title>
        <Table
          columns={bottomTableColumns}
          dataSource={bottomTabledata}
          pagination={{ position: ["none", "none"] }}
        />
      </Col>
    </Row>
  </div>
);

export default Precept;
