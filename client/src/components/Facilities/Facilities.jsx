import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";

import useProperties from "../../hooks/useProperties.jsx";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import { useMutation } from "react-query";
const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });
  const { bedrooms, parkings, bathrooms } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      console.log("bedroom : ", bedrooms);
      console.log("bedroom : ", bathrooms);
      console.log("bedroom : ", parkings);
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      console.log(
        "property in last after update every things : ",
        propertyDetails
      );
      console.log("no error ");
      // uploadDetails();
      mutate();
    }
  };

  //------------Upload logic
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();
  //  const uploadDetails = async () => {
  //       if(userDetails){
  //          console.log("userDetails in last step : ",userDetails);
  //          const updateUser =  await createResidency(propertyDetails,userDetails);
  //          console.log(" come form createresidency", updateUser);
  //          setPropertyDetails({
  //           title: "",
  //           description: "",
  //           price: 0,
  //           country: "",
  //           city: "",
  //           address: "",
  //           image: null,
  //           facilities: {
  //             bedrooms: 0,
  //             parkings: 0,
  //             bathrooms: 0,
  //           },
  //           userEmail: userDetails?.user?.email,
  //         })
  //         console.log("propertyDetails after compeletion : ", propertyDetails);

  //         setOpened(false)
  //         setActiveStep(0)
  //         refetchProperties()
  //       }
  //       else{
  //         toast.error("something went wrong");
  //       }
  //  }

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>createResidency({ ...propertyDetails, facilities: { bedrooms, parkings, bathrooms } },userDetails ),
    onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: userDetails?.user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="no of bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="no of parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="no of bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
