import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import Cars from "../lists/Cars";
import RemoveItem from "../buttons/RemoveItem";
import UpdatePerson from "../forms/UpdatePerson";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, firstName, lastName } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          title={firstName + " " + lastName}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveItem id={id} type="person" />,
          ]}
        >
          <Cars personId={id} />
        </Card>
      )}
    </div>
  );
};

export default PersonCard;
