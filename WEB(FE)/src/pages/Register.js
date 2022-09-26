import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    DatePicker,
} from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
        {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
            {
                value: 'xihu',
                label: 'West Lake',
            },
            ],
        },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
        {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
            {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
            },
            ],
        },
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 8,
        },
    },
    wrapperCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const classSelector = (
        <Form.Item name="class" noStyle>
        <Select
            style={{
            width: 70,
            }}
        >
            <Option value="private">이병/일병</Option>
            <Option value="corporal">상병</Option>
            <Option value="segrent">병장</Option>
        </Select>
        </Form.Item>
    );
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
        <Select
            style={{
            width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
        </Form.Item>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
        <Select
            style={{
            width: 70,
            }}
        >
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
        </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = (value) => {
        if (!value) {
        setAutoCompleteResult([]);
        } else {
        setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    return (
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
        }}
        scrollToFirstError
        >
        <Form.Item
            name="name"
            label="이름"
            rules={[
            {
                type: 'string',
                message: '유효한 이름이 아닙니다!',
            },
            {
                required: true,
                message: '이름을 입력해주세요',
            },
            ]}
        >
            <Input placeholder="이름"/>
        </Form.Item>
        <Form.Item
            name="service_number"
            label="군번"
            rules={[
            {
                type: 'string',
                message: '유효한 군번이 아닙니다!',
            },
            {
                required: true,
                message: '군번을 입력해주세요',
            },
            ]}
        >
            <Input placeholder="군번"/>
        </Form.Item>

        <Form.Item
            name="password"
            label="비밀번호"
            rules={[
            {
                required: true,
                message: '비밀번호를 입력해 주세요',
            },
            ]}
            hasFeedback
        >
            <Input.Password placeholder="비밀번호"/>
        </Form.Item>

        <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: '비밀번호를 확인해 주세요',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
                },
            }),
            ]}
        >
            <Input.Password placeholder="비밀번호 확인"/>
        </Form.Item>

        <Form.Item
            name="birthday"
            label="생년월일"
            rules={[
            {
                type: 'string',
                message: '올바른 생년월일을 입력해 주세요',
            },
            {
                required: true,
                message: '생년월일을 입력해 주세요',
            },
            ]}
        >
            <Input placeholder="주민등록번호 앞 6자리를 입력해 주세요"/>
        </Form.Item>

        <Form.Item
            name="division"
            label="소속부대"
            rules={[
            {
                type: 'string',
                message: '올바른 부대명을 입력해 주세요',
            },
            {
                required: true,
                message: '부대명을 입력해 주세요',
            },
            ]}
        >
            <Input placeholder="중대 단위까지 입력해 주세요"/>
        </Form.Item>

        <Form.Item
            name="division_code"
            label="부대코드"
            rules={[
            {
                type: 'string',
                message: '올바른 부대코드를 입력해 주세요',
            },
            {
                required: true,
                message: '부대코드를 입력해 주세요',
            },
            ]}
        >
            <Input placeholder="부대코드"/>
        </Form.Item>

        <Form.Item
            name="class"
            label="계급"
        >
            <Input.Group compact>
                <Select defaultValue="private">
                    <Option value="private">이병/일병</Option>
                    <Option value="corporal">상병</Option>
                    <Option value="segrent">병장</Option>
                </Select>
            </Input.Group>
        </Form.Item>

        <Form.Item
            name="discharge_date"
            label="전역일"
            rules={[
            {
                required: true,
                message: '전역일을 선택해 주세요',
            },
            ]}
        >
            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
        </Form.Item>

        <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
            {
                validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
            ]}
            {...tailFormItemLayout}
        >
            <Checkbox>
            I have read the <a href="">agreement</a>
            </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
            Register
            </Button>
        </Form.Item>
        </Form>
    );
};

export default Register;
