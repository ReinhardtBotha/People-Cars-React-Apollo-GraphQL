import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import Cars from "../lists/Cars";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, firstName, lastName } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <Card
      title={firstName + " " + lastName}
      actions={[
        <EditOutlined key="edit" onClick={handleButtonClick} />,
        <EditOutlined key="delete" onClick={handleButtonClick} />,
      ]}
    >
      <Cars id={id} />
    </Card>
  );
};

export default PersonCard;
