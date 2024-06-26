import { Divider } from "antd";

const Title = ({ text }) => {
  const styles = getStyles();
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{text}</h1>
    </div>
  );
};

const getStyles = () => ({
  title: {
    fontSize: 20,
    color: "#2a2a2a",
  },
  container: {
    width: "100%",
    textAlign: "center",
  },
});

export default Title;
