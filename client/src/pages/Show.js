import "../App.css";
import Title from "../components/layout/Title";
import Heading from "../components/layout/Heading";
import { useParams } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Button, List, Typography } from "antd";

const Show = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personWithCarsId: id },
  });

  const onButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="App">
      <Title text={"PEOPLE AND THEIR CARS"} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "100%" }}>
          <Heading
            text={
              data?.personWithCars.firstName +
              " " +
              data?.personWithCars.lastName
            }
          />
          <List
            bordered
            dataSource={data?.personWithCars.cars}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>Year: </Typography.Text> {item.year}
                <Typography.Text> Make: </Typography.Text> {item.make}
                <Typography.Text> Model: </Typography.Text> {item.model}
                <Typography.Text> Price: </Typography.Text> {item.price}
              </List.Item>
            )}
          />

          <Button onClick={onButtonClick}>Back</Button>
        </div>
      )}
    </div>
  );
};

export default Show;
