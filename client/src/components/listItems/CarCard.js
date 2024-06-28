import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import RemoveItem from "../buttons/RemoveItem";
import UpdateCar from "../forms/UpdateCar";

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, year, make, model, price, personId } = props;
  const priceFormatted = Number(price).toLocaleString();
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
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
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export default CarCard;
