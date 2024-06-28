import "../App.css";
import Title from "../components/layout/Title";
import People from "../components/lists/People";
import AddPerson from "../components/forms/AddPerson";
import AddCar from "../components/forms/AddCar";
import Heading from "../components/layout/Heading";



const Home = () => {
  return (
    
      <div className="App">
        <Title text={"PEOPLE AND THEIR CARS"} />
        <AddPerson />
        <AddCar />
        <Heading text="Records" />
        <People />
      </div>
   
  );
};

export default Home;
