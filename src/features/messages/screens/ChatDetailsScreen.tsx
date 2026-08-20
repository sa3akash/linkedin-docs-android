import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../../hooks/useStyles';
import { useKeyboardAvoidance } from '../../../hooks/useKeyboardAvoidance';
import { useChatStore } from '../../../stores/chat.store';
import { TextInput, PrimaryButton } from '../../../components';
import { messagesApi } from '../api/messages.api';
import { ChatMessage } from '../../../types';
import { Theme } from '../../../theme';

export interface ChatDetailsScreenProps {
  conversationId: string;
  recipientName: string;
}

export const ChatDetailsScreen: React.FC<ChatDetailsScreenProps> = ({
  conversationId,
  recipientName,
}) => {
  const { t } = useTranslation();
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;
  const { containerPaddingBottom } = useKeyboardAvoidance({ extraOffset: 0 });

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.subtitle1, styles.headerTitle]}>{recipientName}</Text>
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
                isMe ? styles.myBubble : styles.otherBubble,
              ]}
            >
              <Text
                style={[
                  typography.body2,
                  isMe ? styles.myMessageText : styles.otherMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      <View style={[styles.inputRow, { marginBottom: containerPaddingBottom }]}>
        <TextInput
          placeholder={t('messages.typeMessage')}
          value={inputText}
          onChangeText={setInputText}
          containerStyle={styles.textInputContainer}
        />
        <PrimaryButton title={t('feed.send')} onPress={handleSend} style={styles.sendBtn} />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    padding: theme.spacing.md,
    alignItems: 'center' as const,
  },
  headerTitle: {
    color: theme.colors.textPrimary,
  },
  messageBubble: {
    maxWidth: '75%' as const,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xxs,
    marginHorizontal: theme.spacing.md,
  },
  myBubble: {
    alignSelf: 'flex-end' as const,
    backgroundColor: theme.colors.primary,
  },
  otherBubble: {
    alignSelf: 'flex-start' as const,
    backgroundColor: theme.colors.surface,
  },
  myMessageText: {
    color: theme.colors.textInverse,
  },
  otherMessageText: {
    color: theme.colors.textPrimary,
  },
  inputRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  textInputContainer: {
    flex: 1,
    marginBottom: 0,
    marginRight: theme.spacing.sm,
  },
  sendBtn: {
    width: 80,
  },
});
