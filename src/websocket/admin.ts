import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";

io.on("connect", async () => {
  const connectionService = new ConnectionsService();

  const allConnectionsWithoutAdmin =
    await connectionService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
});
