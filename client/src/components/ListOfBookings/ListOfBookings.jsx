import React from "react";
import { Modal,ScrollArea, Center } from "@mantine/core";
import ListItem from "../ListItem/ListItem.jsx";

const ListOfBookings = ({ opened, setOpened, propertyId,data}) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <span className="orangeText flexColCenter" style={{textAlign:"center"}}>List of Booked Dates</span>
        <ScrollArea h={250} w={300}  >
          { 
            (data?.bookDate)?.map((obj) => (
                <ListItem date={obj?.date}/>
            ))
          }
        </ScrollArea>
      </div>
    </Modal>
  );
};

export default ListOfBookings;
