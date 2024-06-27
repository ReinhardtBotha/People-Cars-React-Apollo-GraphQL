import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import RemoveItem from "../buttons/RemoveItem";

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, year, make, model, price, personId } = props;
  const priceFormatted = Number(price).toLocaleString();
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <Card
      type="inner"
      style={styles.card}
      actions={[
        <EditOutlined key="edit" onClick={handleButtonClick} />,
        <RemoveItem id={id} personId={personId} type="car" />,
      ]}
    >
      {year} {make} {model} {"-> $"}
      {priceFormatted}
    </Card>
  );
};

const getStyles = () => ({
  card: {
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export default CarCard;
