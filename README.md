# Parking Control

---
## Main Features

- [x] Register a new parking
- [x] Register a parked vehicle exit
- [ ] List all parked vehicles

---
## Rules

- [x] The parked vehicle must be registered with the following information:
    - [x] Vehicle plate
    - [x] Entry date and time
- [x] The vehicle exit must be registered with the following information:
    - [x] Vehicle plate
    - [x] Exit date and time
- [ ] The system must be able to list all parked vehicles with the following information:
    - [ ] Vehicle plate
    - [ ] Entry date and time
    - [ ] Exit date and time
    - [ ] Total time parked
    - [ ] Total value to be paid
- [ ] The system must be able to list all vehicles that are parked at the moment
- [x] The system must be able to prevent the parking registration of a vehicle that is already parked
- [x] The system must be able to prevent the parking exit registration of a vehicle that is not parked
- [x] The system must be able to inform the total value to be paid by the vehicle
    - [x] The first 15 minutes of parking are free
    - [x] The first hour of parking is R$ 5,00
    - [x] After the first hour, each additional hour is R$ 3,00
    - [x] The value to be paid must be rounded up to the nearest hour
    - [x] The system must be able to inform the total time parked by the vehicle
    - [x] The system must be able to inform the total value to be paid by the vehicle


## Technologies

- [x] [Nx, a Smart, fast and extensible build system.](https://nx.dev)
- [ ] [Typeorm](https://typeorm.io/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [ ] [PostgreSQL](https://www.postgresql.org/)
- [x] [Jest](https://jestjs.io/)
- [x] [Luxon](https://moment.github.io/luxon/)

