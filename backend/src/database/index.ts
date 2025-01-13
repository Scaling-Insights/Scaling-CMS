import { AppDataSource } from "src/database/data-source"
import { User } from "src/shared/entities/user.entity"

AppDataSource.initialize().then(async () => {
    try {
        const userRepo = AppDataSource.getRepository(User);

        const user = new User();
        user.id = 7265738540758077449n;
        user.username = "Peterpan";
        user.email = "Peter@pan.nl";
        user.password = "peterpan123";

        await userRepo.save(user);
        //console.log("User created successfully:", user);
    } catch (error) {
        console.error("Error creating user: ", error);
    }
}).catch(error => {
    console.error("Database Initialization Error: ", error);
});

export const createDefaultUser = async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = new User();
    user.id = 7265738540758077449n;
    user.username = "Peterpan2";
    user.email = "Peter2@pan.nl";
    user.password = "12345";

    await userRepo.save(user);

    return user;
};
