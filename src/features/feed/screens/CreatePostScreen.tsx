import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { PrimaryButton, SecondaryButton } from '../../../components';
import { useFeedStore } from '../../../stores/feed.store';
import { feedApi } from '../api/feed.api';

export interface CreatePostScreenProps {
  onClose: () => void;
}

export const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ onClose }) => {
  const { colors, spacing, radius, typography } = useTheme();
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
    <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing.lg }]}>
      <View style={styles.header}>
        <Text style={[typography.h2, { color: colors.textPrimary }]}>Create a post</Text>
        <SecondaryButton title="Close" onPress={onClose} style={{ width: 80 }} />
      </View>

      <TextInput
        placeholder="What do you want to talk about?"
        placeholderTextColor={colors.textMuted}
        value={content}
        onChangeText={setContent}
        multiline
        autoFocus
        style={[
          styles.textArea,
          typography.body1,
          { color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md },
        ]}
      />

      <PrimaryButton
        title="Post"
        onPress={handlePublish}
        isLoading={isPublishing}
        disabled={!content.trim()}
        style={{ marginTop: spacing.lg }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    textAlignVertical: 'top',
  },
});
