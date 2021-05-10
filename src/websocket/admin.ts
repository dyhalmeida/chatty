import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async (socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();
  const connections = await connectionsService.index();
  io.emit('admin_list_all_users', connections);

  /** Lista a mensagens do cliente para o atendente */
  socket.on('admin_list_messages_by_user', async (params, done) => {
    const { user_id } = params;
    const messages = await messagesService.index(user_id);
    done(messages);
  });

  /** Salvando a mensagem do atendente para um cliente */
  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;
    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    /** Busca o socket_id do cliente para enviar a mensagem */
    const { socket_id } = await connectionsService.show(user_id);

    /** Emite um evento para o cliente */
    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id, // socket id do atendente
    });
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;
    await connectionsService.updateAdminID(user_id, socket.id);
    const connections = await connectionsService.index();
    io.emit('admin_list_all_users', connections);
  });
});
