import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
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
            persons: filter(persons, (p) => p.id !== removedItem.id),
          },
        });
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
            personCars: filter(personCars, (c) => c.id !== removedItem.id),
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
