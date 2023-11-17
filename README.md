# Parking Control

---
## Main Features

- [ ] Register a new parking
- [ ] Register a new parking exit
- [ ] List all parked vehicles

---
## Rules

- [ ] The parked vehicle must be registered with the following information:
    - [ ] Vehicle plate
    - [ ] Entry date and time
- [ ] The vehicle exit must be registered with the following information:
    - [ ] Vehicle plate
    - [ ] Exit date and time
- [ ] The system must be able to list all parked vehicles with the following information:
    - [ ] Vehicle plate
    - [ ] Entry date and time
    - [ ] Exit date and time
    - [ ] Total time parked
    - [ ] Total value to be paid
- [ ] The system must be able to list all vehicles that are parked at the moment
- [ ] The system must be able to prevent the parking registration of a vehicle that is already parked
- [ ] The system must be able to prevent the parking exit registration of a vehicle that is not parked
- [ ] The system must be able to inform the total value to be paid by the vehicle
    - [ ] The first hour of parking is R$ 5,00
    - [ ] The first 15 minutes of parking are free
    - [ ] After the first hour, each additional hour is R$ 3,00
    - [ ] The value to be paid is R$ 5,00 per hour
    - [ ] The value to be paid must be rounded up to the nearest hour
    - [ ] The system must be able to inform the total time parked by the vehicle
    - [ ] The system must be able to inform the total value to be paid by the vehicle


## Technologies

- [x] [Nx, a Smart, fast and extensible build system.](https://nx.dev)
- [ ] [Typeorm](https://typeorm.io/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [ ] [PostgreSQL](https://www.postgresql.org/)
- [ ] [Jest](https://jestjs.io/)

