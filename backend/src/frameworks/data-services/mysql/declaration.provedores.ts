import Declaration from "./model/declaration.model";

export const declarationProviders = [
  {
    provide: 'DECLARATION_REPOSITORY',
    useValue: Declaration,
  },
];