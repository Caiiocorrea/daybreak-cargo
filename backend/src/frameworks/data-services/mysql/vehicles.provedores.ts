import Vehicle from "./model/vehicles.model";


export const vehiclesProviders = [
  {
    provide: 'VEHICLE_REPOSITORY',
    useValue: Vehicle,
  },
];