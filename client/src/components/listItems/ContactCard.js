import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const ContactCard = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { id, firstName, lastName } = props;

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <Card title={firstName + " " + lastName}>
      <Card
        type="inner"
        style={styles.card}
        actions={[
          <EditOutlined key="edit" onClick={handleButtonClick} />,
          <EditOutlined key="delete" onClick={handleButtonClick} />,
        ]}
      >
        {firstName}
      </Card>
    </Card>
  );
};

const getStyles = () => ({
  card: {
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

export default ContactCard;
