import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CAR_BY_PERSON } from "../../graphql/queries";
import CarCard from "../listItems/CarCard";

const Cars = (props) => {
  const { id } = props;
  const { loading, error, data } = useQuery(GET_CAR_BY_PERSON, {
    variables: { personId: id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List grid={{ gutter: 20, column: 1 }}>
      {data.personCars.map(({ year, make, model, price, id }) => (
        <List.Item key={id}>
          <CarCard year={year} make={make} model={model} price={price} />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
