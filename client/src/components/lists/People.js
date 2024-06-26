import { useQuery } from "@apollo/client";
import { List } from "antd";
import PersonCard from "../listItems/PersonCard";
import { GET_PERSON } from "../../graphql/queries";

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PERSON);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List style={styles.list} grid={{ gutter: 20, column: 1 }}>
      {data.persons.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    width: "100%",
  },
});

export default People;
