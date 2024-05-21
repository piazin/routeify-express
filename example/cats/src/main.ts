import createExpressServer from "routeify-express";
import { CatsController } from "./controller";

createExpressServer({
  controllers: [CatsController],
  defaultExpressJson: true,
}).listen(3000, () => console.info("http://localhost:3000"));
