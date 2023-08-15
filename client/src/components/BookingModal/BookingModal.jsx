import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UserDetailContext } from "../../context/UserDetailContext.jsx";
import { bookVisit } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const BookingModal = ({ opened, setOpened, propertyId }) => {
  const [value, setValue] = useState(null);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const navigate = useNavigate();
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setValue(null);
        setOpened(false)
      }}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button
          disabled={!value}
          onClick={async () => {
            const detailsToBook = {
              token: userDetails.token,
              user: userDetails.user,
              date: value,
            };
            const updateUser = await bookVisit(detailsToBook, propertyId);
            if (updateUser) {
              const token = userDetails.token;
              localStorage.setItem(
                "userInfo",
                JSON.stringify({ token: token, user: updateUser })
              );
              setUserDetails(JSON.parse(localStorage.getItem('userInfo')));
            }
            setOpened(false);
            setValue(null);
            navigate("/");
          }}
        >
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;

// import React, { useContext, useState } from "react";
// import { Modal, Button } from "@mantine/core";
// import { DatePicker } from "@mantine/dates";
// import { useMutation } from "react-query";

// import { UserDetailContext } from "../../context/UserDetailContext.jsx";
// import { bookVisit } from "../../utils/api.js";
// import { useNavigate } from "react-router-dom";
// const BookingModal = ({ opened, setOpened, propertyId }) => {
//   const [value, setValue] = useState(null);
//   const { userDetails, setUserDetails } = useContext(UserDetailContext);
//   const navigate = useNavigate();
//   const detailsToBook ={};
//   const handleBookingSuccess = () => {
       
//   }
//   const { mutate, isLoading } = useMutation({
//     mutationFn: () => bookVisit({token:userDetails.token,user:userDetails.user,date:value}, propertyId),
//     onSuccess: () => handleBookingSuccess(),
//     onError: ({ response }) => toast.error(response.data.message),
//     onSettled: () => setOpened(false),
//   });

//   return (
//     <Modal
//       opened={opened}
//       onClose={() => setOpened(false)}
//       title="Select your date of visit"
//       centered
//     >
//       <div className="flexColCenter" style={{ gap: "1rem" }}>
//         <DatePicker value={value} onChange={setValue} minDate={new Date()} />
//         <Button
//           disabled={!value}
//           onClick={async () => {
//             mutate();
//           }}
//         >
//           Book visit
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default BookingModal;
