import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { useStyles } from '../../../hooks/useStyles';
import { useKeyboardAvoidance } from '../../../hooks/useKeyboardAvoidance';
import { PrimaryButton, SecondaryButton } from '../../../components';
import { useFeedStore } from '../../../stores/feed.store';
import { feedApi } from '../api/feed.api';
import { Theme } from '../../../theme';
import { usePermissionGuard } from '../../../core/permissions/usePermissionGuard';

export interface CreatePostScreenProps {
  onClose: () => void;
}

export const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ onClose }) => {
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;
  const { containerPaddingBottom } = useKeyboardAvoidance({ extraOffset: 16 });

  const { prependPost } = useFeedStore();
  const [content, setContent] = useState('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Permission Guards for features requiring device permissions
  const { executeWithPermission: handleAttachPhoto } = usePermissionGuard('photos');
  const { executeWithPermission: handleOpenCamera } = usePermissionGuard('camera');

  const onAddPhotoPress = () => {
    handleAttachPhoto(() => {
      console.log('[CreatePost] Photo permission granted. Opening photo gallery...');
      setMediaUri('https://picsum.photos/400/300');
    });
  };

  const onCameraPress = () => {
    handleOpenCamera(() => {
      console.log('[CreatePost] Camera permission granted. Opening camera capture...');
      setMediaUri('https://picsum.photos/400/300');
    });
  };

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

      {mediaUri && <Image source={{ uri: mediaUri }} style={styles.previewImage} />}

      {/* Feature Toolbar requiring permission guards */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolBtn} onPress={onAddPhotoPress}>
          <Text style={styles.toolBtnText}>🖼️ Add Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={onCameraPress}>
          <Text style={styles.toolBtnText}>📷 Camera</Text>
        </TouchableOpacity>
      </View>

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
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: theme.radius.md,
    marginTop: 12,
  },
  toolbar: {
    flexDirection: 'row' as const,
    gap: 12,
    marginTop: 12,
  },
  toolBtn: {
    padding: 10,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
  },
  toolBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600' as const,
  },
  publishBtn: {
    marginTop: theme.spacing.lg,
  },
});
