import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";
io.on("connect", (socket) => {
  const connectionService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async ({ text, email }) => {
    const socket_id = socket.id;

    const userExists = await usersService.findByEmail(email);

    let user_id: string;

    console.log(userExists);

    if (!userExists) {
      const user = await usersService.create(email);
      user_id = user.id;

      await connectionService.create({
        socket_id,
        user_id
      });
    } else {
      user_id = userExists.id;
    }

    const connection = await connectionService.findByUserId(user_id);

    if (!connection) {
      await connectionService.create({
        socket_id,
        user_id
      });
    } else {
      connection.socket_id = socket_id;

      await connectionService.create(connection);
    }

    await messagesService.create({ text, user_id });
    const allMessages = await messagesService.listByUsers(user_id);

    socket.emit("client_list_all_messages", allMessages);
  });
});
