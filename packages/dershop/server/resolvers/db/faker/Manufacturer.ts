import { updateDates } from "@corejam/base";
import type { SEOInput } from "@corejam/base/dist/typings/Seo";
import { random } from "faker";
import type {
  ManufacturerCreateInput,
  ManufacturerDB,
  ManufacturerEditInput,
} from "../../../../shared/types/Manufacturer";
import { generateManufacturer } from "./Generator";

export let manufacturers = [] as ManufacturerDB[];

try {
  const staticFile = require(process.cwd() + "/.corejam/faker.json");
  manufacturers.push(...staticFile.manufacturers);
  console.log("Load from static data");
} catch (e) {
  //Nothing for now
}

if (manufacturers.length === 0) {
  for (let index = 0; index < 5; index++) {
    manufacturers.push({
      id: random.uuid(),
      ...generateManufacturer(),
    });
  }
}

export function allManufacturers(): Promise<ManufacturerDB[]> {
  return new Promise((res) => res(manufacturers));
}

export function manufacturerCreate(manufacturerInput: ManufacturerCreateInput): Promise<ManufacturerDB> {
  const manufacturer: ManufacturerDB = {
    id: random.uuid(),
    ...manufacturerInput,
    ...updateDates(),
  };

  manufacturers.push(manufacturer);

  return new Promise((res) => res(manufacturer));
}

export function manufacturerByID(id: string): Promise<ManufacturerDB | null> {
  return new Promise((res) => res(manufacturers.filter((manufacturer: ManufacturerDB) => manufacturer.id === id)[0]));
}

export function manufacturerByUrl(slug: string): Promise<ManufacturerDB | null> {
  const manufacturer = manufacturers.filter((manufacturer) => {
    if (manufacturer.seo?.url == slug) {
      return manufacturer;
    }
    return;
  })[0];

  return new Promise((res) => res(manufacturer));
}

export function manufacturerEdit(id: string, manufacturerInput: ManufacturerEditInput): Promise<ManufacturerDB> {
  let manufacturer = manufacturers.filter((manufacturer: ManufacturerDB) => {
    return manufacturer.id === id;
  })[0];

  manufacturer = { ...manufacturer, ...manufacturerInput };

  manufacturers = manufacturers.map((manufacturer: ManufacturerDB) => {
    if (manufacturer.id === id) {
      manufacturer = { ...manufacturer, ...manufacturerInput };
    }
    return manufacturer;
  });

  return new Promise((res) => res(manufacturer));
}

export function manufacturersForSelect(): Promise<ManufacturerDB[]> {
  return new Promise((res) => res(manufacturers));
}

export function manufacturerEditSEO(id: string, seoInput: SEOInput): Promise<ManufacturerDB> {
  const manufacturer = manufacturers.filter((manufacturer: ManufacturerDB) => {
    if (manufacturer.id == id) {
      manufacturer.seo = seoInput;
      return manufacturer;
    }
    return;
  });

  return new Promise((res) => res(manufacturer[0]));
}
