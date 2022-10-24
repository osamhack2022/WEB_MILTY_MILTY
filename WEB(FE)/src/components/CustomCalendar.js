import React from "react";
import { Calendar, Row, Col, Space, Button, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/ko";
import locale from "antd/es/calendar/locale/ko_KR";

const customHeader = ({ value, onChange }) => {
  const monthOptions = [];
  const current = value.clone();
  const localeData = value.localeData();
  const months = [];

  for (let i = 0; i < 12; i += 1) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let i = 0; i < 12; i += 1) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>
    );
  }

  const year = value.year();
  const month = value.month();
  const options = [];

  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Row justify="space-between">
        <Col>
          <Button
            icon={<LeftOutlined />}
            onClick={() => {
              onChange(value.clone().add(-1, "month"));
            }}
          />
        </Col>
        <Col>
          <Space>
            <Select
              value={year}
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
            >
              {options}
            </Select>
            <Select
              value={month}
              onChange={(newMonth) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Space>
        </Col>
        <Col>
          <Button
            icon={<RightOutlined />}
            onClick={() => {
              onChange(value.clone().add(1, "month"));
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

const CustomCalendar = (props) => {
  const { defaultValue = moment(), dateCellRender, onSelect, style } = props;

  return (
    <Calendar
      className="custom-calendar"
      locale={locale}
      style={{ padding: "0.5rem", ...style }}
      defaultValue={defaultValue}
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      headerRender={customHeader}
    />
  );
};

export default CustomCalendar;
