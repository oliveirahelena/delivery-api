import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { FindAllDeliveriesByDeliverymanController } from "./modules/deliveries/useCases/findAllDeliveriesByDeliveryman/FindAllDeliveriesByDeliverymanController";
import { FindAllDeliveriesCreatedByClientController } from "./modules/deliveries/useCases/findAllDeliveriesCreatedByClient/FindAllDeliveriesCreatedByClientController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesCreatedByClientController = new FindAllDeliveriesCreatedByClientController();
const findAllDeliveriesByDeliverymanController = new FindAllDeliveriesByDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman/", createDeliverymanController.handle);

routes.post("/client/authenticate/", authenticateClientController.handle);
routes.post("/deliveryman/authenticate/", authenticateDeliverymanController.handle);

routes.post("/delivery/", ensureAuthenticateClient, createDeliveryController.handle);
routes.get("/delivery/available/", ensureAuthenticateDeliveryman, findAllAvailableController.handle);
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.get("/delivery/clients/", ensureAuthenticateClient, findAllDeliveriesCreatedByClientController.handle);
routes.get("/delivery/deliveryman/", ensureAuthenticateDeliveryman, findAllDeliveriesByDeliverymanController.handle);
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle);

export { routes };