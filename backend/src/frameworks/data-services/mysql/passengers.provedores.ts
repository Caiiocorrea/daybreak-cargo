import Passengers from "./model/passengers.model";


export const passengersProviders = [
  {
    provide: 'PASSENGERS_REPOSITORY',
    useValue: Passengers,
  },
];