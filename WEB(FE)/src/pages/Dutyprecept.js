import React from "react"
import { useParams } from "react-router-dom";
import { Layout, PageHeader, Table, Row, Col } from 'antd';
import {
  topTableColumns,
  topTabledata,
  middleTableColumns,
  middleTabledata,
  bottomTableColumns,
  bottomTabledata,
} from "./dutypreceptdummydata";

const { Content } = Layout;

const Dutyprecept = () => {
  const params = useParams();
  console.log(params); // 날짜값 잘 넘어오는지 확인
  return (
    <Layout>
      <Content style={{ padding: "1rem" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
            backgroundColor: "#ECEBE2",
          }}
          onBack={() => null}
          title={"경계작전명령서(" + params.date + ")"}
        />
        <div style={{
          border: "1px solid rgb(235, 237, 240)",
          backgroundColor: "#ECEBE2",
          padding: "0.5rem"
        }}>
          <div style={{ marginBottom: "10px" }}>
            지휘통제실
            <Table
              columns={topTableColumns}
              dataSource={topTabledata}
              pagination={{ position: ["none", "none"], }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Row justify="space-evenly">
              <Col span={12}>
                탄약고
                <Table
                  columns={middleTableColumns}
                  dataSource={middleTabledata}
                  pagination={{ position: ["none", "none"], }}
                />
              </Col>
              <Col span={12}>
                CCTV
                <Table
                  columns={middleTableColumns}
                  dataSource={middleTabledata}
                  pagination={{ position: ["none", "none"], }}
                />
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: "10px" }}>
            불침번
            <Table
              columns={bottomTableColumns}
              dataSource={bottomTabledata}
              pagination={{ position: ["none", "none"], }}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Dutyprecept