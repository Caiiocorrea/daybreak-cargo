import User from "./model/users.model";


export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];