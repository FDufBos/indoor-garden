import Link from 'next/link';

import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { addToCodex } from "../data/firestore";
import { arrayUnion } from "firebase/firestore";
import Router from "next/router";

export default function addToCodexForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        baseDaysBetweenWatering:
          parseInt(e.currentTarget.elements.baseDaysBetweenWatering.value),
      }).then(() => {
        //reload page
        Router.reload();
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="m-6">
      <Link href={'/'} passHref>
      <Button size="xs">Home</Button>
      </Link>
      
      <h1 className="text-2xl mb-8 text-center">Add to Codex</h1>
      <form className="flex flex-wrap gap-8 text-white" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Botanical Name</FormLabel>
          <Input required name="botanicalName"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Common Names (seperated by commas)</FormLabel>
          <Input required name="commonName"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>👨‍👩‍👧‍👧 Family</FormLabel>
          <Input name="family"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Flower Color</FormLabel>
          <Input name="flowerColor"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Plant Type (seperated by commas)</FormLabel>
          <Input name="plantType"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>🌡 Hardiness Zones</FormLabel>
          <Input name="hardinessZones"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Soil Type</FormLabel>
          <Input name="soilType"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Soil Ph</FormLabel>
          <Input name="soilPh"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>📏 Mature Size</FormLabel>
          <Input name="matureSize"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Bloom Time</FormLabel>
          <Input name="bloomTime"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>🗺 Native Areas (sepereated by commas)</FormLabel>
          <Input name="nativeAreas"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>☠️ Toxicity</FormLabel>
          <Input name="toxicity"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>☀️ Sun Exposure (sepereated by commas)</FormLabel>
          <Input name="sunExposure"></Input>
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
}
