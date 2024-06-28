import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import {
  UPDATE_CAR,
  GET_PERSON,
  GET_CAR_BY_PERSON,
} from "../../graphql/queries";

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId, onButtonClick } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { Option } = Select;
  const { data } = useQuery(GET_PERSON);
  const [owner, setOwner] = useState(personId);

  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onPersonChange = (value) => {
    setOwner(value);
  };

  const onFinish = (values) => {
    const { year, make, model, price } = values;

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId: owner,
      },
      // update: (cache, { data: { updateCar } }) => {
      //   const data = cache.readQuery({
      //     query: GET_CAR_BY_PERSON,
      //     variables: { personId: owner },
      //   });

      //   console.log("data:", data);

      //   cache.writeQuery({
      //     query: GET_CAR_BY_PERSON,
      //     variables: { personId: owner },
      //     data: {
      //       ...data,
      //       personCars: [...data.personCars, updateCar],
      //     },
      //   });
      // },
    });
    onButtonClick();
  };

  return (
    <Form
      name="update-car-form"
      layout="inline"
      form={form}
      initialValues={{
        year,
        make,
        model,
        price,
        person: personId,
      }}
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("person")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
