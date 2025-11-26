import { faker } from '@faker-js/faker';

export const options = [
  ...Array.from(Array(30).keys()).map((data) => ({
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    username: faker.internet.username(),
    email: faker.internet.email(),
    address: {
      street: faker.location.street(),
      suite: faker.location.secondaryAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude()
      }
    },
    phone: faker.phone.number(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase()
    }
  }))
];

export const optionsBase = (count = 30) => [
  ...Array.from(Array(count).keys()).map((data) => ({
    value: faker.string.uuid(),
    label: `${faker.person.firstName()} ${faker.person.lastName()}`
  }))
];

export const optionsSimple = (count = 30) => [
  ...Array.from(Array(count).keys()).map((data) => ({
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`
  }))
];
