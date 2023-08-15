import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "../Properties/Properties.css";
import useProperties from "../../hooks/useProperties";
import { ThreeCircles } from "react-loader-spinner";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { UserDetailContext } from "../../context/UserDetailContext";
import MyPropertyCard from "../../components/MyPropertyCard/MyPropertyCard";

const MyProperties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {userDetails} = useContext(UserDetailContext);
  // console.log(data);
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#eb5f34"
          innerCircleColor="#eb5f34"
          middleCircleColor="#eb5f34"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {
            //data.map((card, i)=> (<PropertyCard card={card} key={i}/>))
            data
              .filter((property) =>
                   property?.userEmail === userDetails?.user?.email
              )
              .filter(
                (property) =>
                  property?.title?.toLowerCase().includes(filter?.toLowerCase()) ||
                  property?.city?.toLowerCase().includes(filter?.toLowerCase()) ||
                  property?.country?.toLowerCase().includes(filter?.toLowerCase())
              )
              .map((card, i) => (
                <MyPropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
