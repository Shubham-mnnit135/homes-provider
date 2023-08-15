import React, { useContext } from "react";
import { Modal,ScrollArea, Center } from "@mantine/core";
import ListItem from "../ListItem/ListItem.jsx";
import { UserDetailContext } from "../../context/UserDetailContext.jsx";
import ListItemWithCancel from "../ListItemWithCancel/ListItemWithCancel.jsx";

const ListOfMyBookingDates = ({ opened, setOpened, propertyId}) => {
  const {userDetails,setUserDetails} = useContext(UserDetailContext) 
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
            (userDetails?.user?.bookedVisits)?.filter((visit) => visit.id===propertyId)
            .map((visit) => (
                
                   <ListItemWithCancel date={visit?.date} propertyId={propertyId}/>
            ))
          }
        </ScrollArea>
      </div>
    </Modal>
  );
};

export default ListOfMyBookingDates;
