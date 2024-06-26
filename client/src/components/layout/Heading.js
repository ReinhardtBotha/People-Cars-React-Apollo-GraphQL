import { Divider } from "antd";

const Heading = ({ text }) => {
  const styles = getStyles();
  return (
    <Divider>
      <h1 style={styles.title}>{text}</h1>
    </Divider>
  );
};

const getStyles = () => ({
  title: {
    fontSize: 20,
    color: "#2a2a2a",
  },
});

export default Heading;
