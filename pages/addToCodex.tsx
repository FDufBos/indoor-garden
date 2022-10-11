import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";

import { addToCodex } from "../data/firestore";

export const AddToCodexForm: React.FC = () => {
  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();

    await addToCodex(e.currentTarget.elements.botanicalName.value, {
      botanicalName: e.currentTarget.elements.botanicalName.value,
      commonName: e.currentTarget.elements.commonName.value.split(","),
      family: e.currentTarget.elements.family.value,
      flowerColor: e.currentTarget.elements.flowerColor.value,
      hardinessZones: e.currentTarget.elements.hardinessZones.value,
      soilType: e.currentTarget.elements.soilType.value,
      soilPh: e.currentTarget.elements.soilPh.value,
      matureSize: e.currentTarget.elements.matureSize.value,
      nativeAreas: e.currentTarget.elements.nativeAreas.value.split(","),
      sunExposure: e.currentTarget.elements.sunExposure.value.split(","),
      bloomTime: e.currentTarget.elements.bloomTime.value,
      plantType: e.currentTarget.elements.plantType.value.split(","),
      toxicity: e.currentTarget.elements.toxicity.value,
      baseDaysBetweenWatering: parseInt(
        e.currentTarget.elements.baseDaysBetweenWatering.value,
        10
      ),
    }).then(() => {
      // reload page
      Router.reload();
    });
  };

  return (
    <div className="m-6">
      <Link href="/" passHref>
        <Button size="xs">Home</Button>
      </Link>

      <h1 className="text-2xl mb-8 text-center">Add to Codex</h1>
      <form className="flex flex-wrap gap-8 text-white" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Botanical Name</FormLabel>
          <Input required name="botanicalName" />
        </FormControl>

        <FormControl>
          <FormLabel>Common Names (seperated by commas)</FormLabel>
          <Input required name="commonName" />
        </FormControl>

        <FormControl>
          <FormLabel>👨‍👩‍👧‍👧 Family</FormLabel>
          <Input name="family" />
        </FormControl>

        <FormControl>
          <FormLabel>Flower Color</FormLabel>
          <Input name="flowerColor" />
        </FormControl>

        <FormControl>
          <FormLabel>Plant Type (seperated by commas)</FormLabel>
          <Input name="plantType" />
        </FormControl>

        <FormControl>
          <FormLabel>🌡 Hardiness Zones</FormLabel>
          <Input name="hardinessZones" />
        </FormControl>

        <FormControl>
          <FormLabel>Soil Type</FormLabel>
          <Input name="soilType" />
        </FormControl>

        <FormControl>
          <FormLabel>Soil Ph</FormLabel>
          <Input name="soilPh" />
        </FormControl>

        <FormControl>
          <FormLabel>📏 Mature Size</FormLabel>
          <Input name="matureSize" />
        </FormControl>

        <FormControl>
          <FormLabel>Bloom Time</FormLabel>
          <Input name="bloomTime" />
        </FormControl>

        <FormControl>
          <FormLabel>🗺 Native Areas (sepereated by commas)</FormLabel>
          <Input name="nativeAreas" />
        </FormControl>

        <FormControl>
          <FormLabel>☠️ Toxicity</FormLabel>
          <Input name="toxicity" />
        </FormControl>

        <FormControl>
          <FormLabel>☀️ Sun Exposure (sepereated by commas)</FormLabel>
          <Input name="sunExposure" />
        </FormControl>

        <FormControl>
          <FormLabel>📆 Base Numbers of Days Between Watering</FormLabel>
          <NumberInput isRequired name="baseDaysBetweenWatering">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button type="submit">Add to Codex</Button>
      </form>
    </div>
  );
};
export default AddToCodexForm;
