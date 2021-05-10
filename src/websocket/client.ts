import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const usersService = new UsersService();
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params: IParams) => {
    const socket_id = socket.id;
    const { text, email } = params;
    let user_id = null;

    const userExist = await usersService.show(email);
    if (!userExist) {
      const user = await usersService.create(email);
      await connectionsService.create({ socket_id, user_id: user.id });
      user_id = user.id;
    } else {
      user_id = userExist.id;
      const connection = await connectionsService.show(userExist.id);
      if (!connection) {
        await connectionsService.create({ socket_id, user_id: userExist.id });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }

    await messagesService.create({
      text,
      user_id,
    });

    const messages = await messagesService.index(user_id);
    socket.emit('list_all_messages', messages);
    const connections = await connectionsService.index();
    io.emit('admin_list_all_users', connections);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionsService.socketID(socket_id);
    const message = await messagesService.create({
      text,
      user_id,
    });
    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
