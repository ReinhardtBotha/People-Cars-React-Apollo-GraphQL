import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import filter from "lodash.filter";
import {
  GET_PERSON,
  REMOVE_PERSON,
  GET_CAR_BY_PERSON,
  REMOVE_CAR,
} from "../../graphql/queries";

const RemoveItem = ({ id, personId = null, type }) => {
  const mutationMap = {
    person: REMOVE_PERSON,
    car: REMOVE_CAR,
  };

  const { data: carData } = useQuery(GET_CAR_BY_PERSON, {
    variables: { personId: id },
    skip: type !== 'person',
  });

  const [removeItem] = useMutation(mutationMap[type], {
    update(
      cache,
      {
        data: {
          [type === "person" ? "removePerson" : "removeCar"]: removedItem,
        },
      }
    ) {
      if (type === "person") {
        const { persons } = cache.readQuery({ query: GET_PERSON });
        cache.writeQuery({
          query: GET_PERSON,
          data: {
            persons: filter(persons, (p) => p.id !== removedItem?.id),
          },
        });

        if (carData) {
          carData.personCars.forEach((car) => {
            cache.modify({
              fields: {
                personCars(existingCars = []) {
                  return existingCars.filter(c => c.__ref !== `Car:${car?.id}`);
                }
              }
            });
          });
        }
      }
      if (type === "car") {
        const { personCars } = cache.readQuery({
          query: GET_CAR_BY_PERSON,
          variables: { personId },
        });

        cache.writeQuery({
          query: GET_CAR_BY_PERSON,
          variables: { personId },
          data: {
            personCars: filter(personCars, (c) => c.id !== removedItem?.id),
          },
        });
      }
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );

    if (result) {
      if (type === "person" && carData) {
        carData.personCars.forEach((car) => {
          removeItem({
            variables: { id: car.id },
            mutation: REMOVE_CAR,
          });
        });
      }

      removeItem({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveItem;
