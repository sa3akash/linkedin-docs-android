import { apiClient } from '../../../services/api/axios';
import { ApiResponse } from '../../../services/api/types';
import { ChatMessage, Conversation } from '../types';

export class ChatApi {
  public static async getConversations(): Promise<Conversation[]> {
    const res = await apiClient.get<ApiResponse<Conversation[]>>('/chat/conversations');
    return res.data.data;
  }

  public static async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const res = await apiClient.get<ApiResponse<ChatMessage[]>>(`/chat/conversations/${conversationId}/messages`);
    return res.data.data;
  }

  public static async sendMessage(payload: Partial<ChatMessage>): Promise<ChatMessage> {
    const res = await apiClient.post<ApiResponse<ChatMessage>>('/chat/messages', payload);
    return res.data.data;
  }

  public static async editMessage(messageId: string, text: string): Promise<ChatMessage> {
    const res = await apiClient.patch<ApiResponse<ChatMessage>>(`/chat/messages/${messageId}`, { text });
    return res.data.data;
  }

  public static async deleteMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/chat/messages/${messageId}`);
  }

  public static async addReaction(messageId: string, emoji: string): Promise<ChatMessage> {
    const res = await apiClient.post<ApiResponse<ChatMessage>>(`/chat/messages/${messageId}/reactions`, { emoji });
    return res.data.data;
  }

  public static async forwardMessage(messageId: string, targetConversationId: string): Promise<ChatMessage> {
    const res = await apiClient.post<ApiResponse<ChatMessage>>(`/chat/messages/${messageId}/forward`, { targetConversationId });
    return res.data.data;
  }

  public static async searchMessages(conversationId: string, query: string): Promise<ChatMessage[]> {
    const res = await apiClient.get<ApiResponse<ChatMessage[]>>(`/chat/conversations/${conversationId}/search`, {
      params: { q: query },
    });
    return res.data.data;
  }
}
