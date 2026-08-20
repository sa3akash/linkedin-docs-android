import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useStyles } from '../../../hooks/useStyles';
import { useKeyboardAvoidance } from '../../../hooks/useKeyboardAvoidance';
import { PrimaryButton, SecondaryButton } from '../../../components';
import { useFeedStore } from '../../../stores/feed.store';
import { feedApi } from '../api/feed.api';
import { Theme } from '../../../theme';

export interface CreatePostScreenProps {
  onClose: () => void;
}

export const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ onClose }) => {
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;
  const { containerPaddingBottom } = useKeyboardAvoidance({ extraOffset: 16 });

  const { prependPost } = useFeedStore();
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!content.trim()) return;
    setIsPublishing(true);
    try {
      const newPost = await feedApi.createPost(content);
      prependPost(newPost);
      onClose();
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: containerPaddingBottom || theme.spacing.lg }]}>
      <View style={styles.header}>
        <Text style={[typography.h2, styles.headerTitle]}>Create a post</Text>
        <SecondaryButton title="Close" onPress={onClose} style={styles.closeBtn} />
      </View>

      <TextInput
        placeholder="What do you want to talk about?"
        placeholderTextColor={theme.colors.textMuted}
        value={content}
        onChangeText={setContent}
        multiline
        autoFocus
        style={[styles.textArea, typography.body1]}
      />

      <PrimaryButton
        title="Post"
        onPress={handlePublish}
        isLoading={isPublishing}
        disabled={!content.trim()}
        style={styles.publishBtn}
      />
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 16,
  },
  headerTitle: {
    color: theme.colors.textPrimary,
  },
  closeBtn: {
    width: 80,
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 12,
    textAlignVertical: 'top' as const,
    color: theme.colors.textPrimary,
  },
  publishBtn: {
    marginTop: theme.spacing.lg,
  },
});
