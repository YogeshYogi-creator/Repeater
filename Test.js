import React, {useState} from "react"
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';
import moment from 'moment';



const Demo = () => {
    const { RangePicker } = DatePicker;
    const [dateValue, setDateValue] = useState([])

    const onFinish = (values, dateStrings) => {
        // const date = {start_date: dateStrings[0], end_date: dateStrings[1]}
        const date = {dateStrings}
        setDateValue(dateStrings)
        console.log("dateStrings", dateStrings)
        console.log('Received values of form:', [values, ...dateValue]);
    };


  function onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="on">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <RangePicker
                    {...restField}
                    name={[name, 'date']}
                    rules={[{ required: true, message: 'Missing date' }]}
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={onFinish}
                    />
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo