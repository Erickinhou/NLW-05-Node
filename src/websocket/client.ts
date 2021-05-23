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

      await connectionService.create(connection); //this keeps the last socket saved
    }

    await messagesService.create({ text, user_id });
    const allMessages = await messagesService.listByUsers(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params)=>{
    
    const socket_id = socket.id;

    console.log('params', params);

    const {text, socket_admin_id} = params
    

    const connection = await connectionService.findBySocketId({socket_id});
    
    const message = await messagesService.create({
      text,
      user_id: connection.user_id
    })
    
    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
      connection
    });
  })

  socket.on("admin_user_in_support", async params => {
    const { user_id } = params;
    await connectionService.updateAdminId(user_id, socket.id);
    
    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  })
});
