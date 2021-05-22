/* eslint-disable prettier/prettier */

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate, id }: ICreateCarDTO): Promise<Car> {

        const car = new Car();

        Object.assign(car, {
            brand, category_id, daily_rate, description, fine_amount, name, license_plate, id
        })

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {

        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAllAvailableCars(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsAvailable = this.cars.filter((car) => {
            if (
                (car.available === true) ||
                ((brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name))) {

                return car;
            }

            return null;
        });

        return carsAvailable;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }
}

export { CarsRepositoryInMemory }