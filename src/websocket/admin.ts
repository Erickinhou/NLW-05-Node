import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
  const connectionService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin =
    await connectionService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin); //this emit for all connections that's hits here

  socket.on("admin_list_messages_by_user", async (params, callback) => { //callback is used to send data to requested again 
    const {user_id} = params;
    const allMessages = await messagesService.listByUsers(user_id)
    callback(allMessages);
  })

  socket.on("admin_send_message", async(params) => {
    const {user_id, text} = params;
    await messagesService.create({user_id, text, admin_id: socket.id}) 

    // In this part, It was needed to send some data to a specific user

    const {socket_id} = await connectionService.findByUserId(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text, 
      socket_id: socket.id // here I'm passing the admin socket
    })
  })

});
