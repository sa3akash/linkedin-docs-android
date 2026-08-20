import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { useChatStore } from '../../../stores/chat.store';
import { TextInput, PrimaryButton } from '../../../components';
import { messagesApi } from '../api/messages.api';
import { ChatMessage } from '../../../types';

export interface ChatDetailsScreenProps {
  conversationId: string;
  recipientName: string;
}

export const ChatDetailsScreen: React.FC<ChatDetailsScreenProps> = ({
  conversationId,
  recipientName,
}) => {
  const { t } = useTranslation();
  const { colors, spacing, radius, typography } = useTheme();
  const { activeMessages, setMessages, appendMessage } = useChatStore();
  const [inputText, setInputText] = useState('');

  const messages = activeMessages[conversationId] || [];

  useEffect(() => {
    messagesApi.getMessages(conversationId).then((msgs) => {
      setMessages(conversationId, msgs);
    });
  }, [conversationId, setMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const msg: ChatMessage = {
      id: `m_${Date.now()}`,
      conversationId,
      senderId: 'u_101',
      recipientId: 'u_501',
      text: inputText,
      status: 'SENT',
      createdAt: 'Just now',
    };
    appendMessage(conversationId, msg);
    setInputText('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, padding: spacing.md }]}>
        <Text style={[typography.subtitle1, { color: colors.textPrimary }]}>{recipientName}</Text>
      </View>

      <FlatList<ChatMessage>
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMe = item.senderId === 'u_101';
          return (
            <View
              style={[
                styles.messageBubble,
                {
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  backgroundColor: isMe ? colors.primary : colors.surface,
                  borderRadius: radius.md,
                  padding: spacing.md,
                  marginVertical: spacing.xxs,
                  marginHorizontal: spacing.md,
                },
              ]}
            >
              <Text
                style={[
                  typography.body2,
                  { color: isMe ? colors.textInverse : colors.textPrimary },
                ]}
              >
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      <View style={[styles.inputRow, { backgroundColor: colors.surface, borderTopColor: colors.border, padding: spacing.md }]}>
        <TextInput
          placeholder={t('messages.typeMessage')}
          value={inputText}
          onChangeText={setInputText}
          containerStyle={{ flex: 1, marginBottom: 0, marginRight: spacing.sm }}
        />
        <PrimaryButton title={t('feed.send')} onPress={handleSend} style={{ width: 80 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
  },
});
