import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { useChatStore } from '../../../stores/chat.store';
import { messagesApi } from '../api/messages.api';
import { Conversation } from '../../../types';

export interface MessagesScreenProps {
  onNavigateToChatDetails: (conversationId: string, recipientName: string) => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({ onNavigateToChatDetails }) => {
  const { t } = useTranslation();
  const { colors, spacing, radius, typography } = useTheme();
  const { conversations, setConversations } = useChatStore();

  useEffect(() => {
    messagesApi.getConversations().then(setConversations);
  }, [setConversations]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList<Conversation>
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              onNavigateToChatDetails(
                item.id,
                `${item.participant.firstName} ${item.participant.lastName}`
              )
            }
            style={[
              styles.item,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                padding: spacing.md,
              },
            ]}
          >
            {item.participant.avatarUrl ? (
              <Image source={{ uri: item.participant.avatarUrl }} style={[styles.avatar, { borderRadius: radius.round }]} />
            ) : (
              <View
                style={[
                  styles.avatarPlaceholder,
                  { backgroundColor: colors.primary, borderRadius: radius.round },
                ]}
              >
                <Text style={[typography.subtitle1, { color: colors.textInverse }]}>
                  {item.participant.firstName.charAt(0)}
                </Text>
              </View>
            )}
            <View style={styles.meta}>
              <View style={styles.nameRow}>
                <Text style={[typography.subtitle1, { color: colors.textPrimary }]}>
                  {item.participant.firstName} {item.participant.lastName}
                </Text>
                <Text style={[typography.overline, { color: colors.textMuted }]}>
                  {item.updatedAt}
                </Text>
              </View>
              <Text style={[typography.body2, { color: colors.textSecondary }]} numberOfLines={1}>
                {item.isTyping ? t('messages.typing') : item.lastMessage?.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});
