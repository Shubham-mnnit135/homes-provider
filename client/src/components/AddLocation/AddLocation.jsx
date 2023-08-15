// import React from "react";
// import { useForm } from "@mantine/form";
// import { validateString } from "../../utils/common";
// import { Select, TextInput } from "@mantine/core";
// import useCountries from "../../hooks/useContries";
// import Map from "../Map/Map";
// const AddLocation = ({ propertyDetails, setPropertyDetails }) => {
//   const { getAll } = useCountries();

//   const form = useForm({
//     initialValues: {
//       country: propertyDetails?.country,
//       city: propertyDetails?.city,
//       address: propertyDetails?.address,
//     },

//     validate: {
//       country: (value) => validateString(value),
//       city: (value) => validateString(value),
//       address: (value) => validateString(value),
//     },
//   });

//   const { country, city, address } = form.values;
//   return (
//     <form>
      
//       <div
//         className="flexCenter"
//         style={{
//           justifyContent: "space-between",
//           gap: "3rem",
//           marginTop: "3rem",
//           flexDirection: "row",
//         }}
//       >
//         {/* left side */}
//         {/* inputs */}
//         <div className="flexColStart">
//           <Select
//             w={"100%"}
//             withAsterisk
//             label="Country"
//             clearable
//             searchable
//             data={getAll()}
//             {...form.getInputProps("country", { type: "input" })}
//           />

//           <TextInput
//             w={"100%"}
//             withAsterisk
//             label="City"
//             {...form.getInputProps("city", { type: "input" })}
//           />

//           <TextInput
//             w={"100%"}
//             withAsterisk
//             label="Address"
//             {...form.getInputProps("address", { type: "input" })}
//           />
//         </div>

//         {/* right side */}

//         <div styled={{ flex: 1 }}>
//           <Map address={address} city={city} country={country} />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddLocation;



import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useContries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });


  const { country, city, address } = form.values;


  const handleSubmit = ()=> {
    console.log("propertyDetails before 1 step : ", propertyDetails);
    const {hasErrors} = form.validate();
    if(!hasErrors) {
        setPropertyDetails((prev)=> ({...prev, city, address, country}))
        console.log("propertyDetails after 1 step : ", propertyDetails);

        nextStep()
    }
  }
  return (
    <form
    onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
    }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/* left side */}
        {/* inputs */}

        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* right side */}

        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
