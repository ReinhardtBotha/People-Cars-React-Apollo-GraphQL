import { Button, Form, Input, Select } from "antd";
import Heading from "../layout/Heading";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_CAR, GET_PERSON } from "../../graphql/queries";

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { Option } = Select;
  const { data } = useQuery(GET_PERSON);
  const [owner, setOwner] = useState();

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onPersonChange = (value) => {
    setOwner(value);
  };

  const onFinish = (values) => {
    const { year, make, model, price } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId: owner,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CAR });

        console.log(data);

        cache.writeQuery({
          query: GET_CAR,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <div>
      {data?.persons.length > 0 && (
        <div>
          <Heading text="Add Car" />
          <Form
            name="add-car-form"
            layout="inline"
            size="large"
            style={{ marginBottom: "40px" }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Please enter a first name" }]}
            >
              <Input placeholder="Year" />
            </Form.Item>
            <Form.Item
              label="Make"
              name="make"
              rules={[{ required: true, message: "Please enter a last name" }]}
            >
              <Input placeholder="Make" />
            </Form.Item>
            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: "Please enter a last name" }]}
            >
              <Input placeholder="Model" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter a last name" }]}
            >
              <Input placeholder="Price" />
            </Form.Item>
            <Form.Item
              name="person"
              label="Person"
              rules={[{ required: true, message: "Please select a person" }]}
            >
              <Select
                placeholder="Select a person"
                onChange={onPersonChange}
                allowClear
              >
                {data.persons.map((person) => (
                  <Option key={person.id} value={person.id}>
                    {person.firstName} {person.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length
                  }
                >
                  Add Car
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddCar;
