import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { year, make, model, price } = props;
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
        <EditOutlined key="delete" onClick={handleButtonClick} />,
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
