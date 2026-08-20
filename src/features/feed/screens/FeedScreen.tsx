import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { useFeedStore } from '../../../stores/feed.store';
import { InfiniteList, PostCard, ShimmerLoader } from '../../../components';
import { feedApi } from '../api/feed.api';
import { Post } from '../../../types';

export interface FeedScreenProps {
  onNavigateToCreatePost: () => void;
  onNavigateToPostDetails: (postId: string) => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({
  onNavigateToCreatePost,
  onNavigateToPostDetails,
}) => {
  const { t } = useTranslation();
  const { colors, spacing, radius, typography } = useTheme();
  const { posts, setPosts, toggleLikePost } = useFeedStore();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    feedApi.getFeedPosts().then((res) => {
      setPosts(res.items);
      setLoading(false);
    });
  }, [setPosts]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ShimmerLoader />
        <ShimmerLoader />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Create Post Header Trigger */}
      <View
        style={[
          styles.createTrigger,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            margin: spacing.md,
            padding: spacing.md,
            borderRadius: radius.round,
          },
        ]}
      >
        <TouchableOpacity style={styles.triggerBtn} onPress={onNavigateToCreatePost}>
          <Text style={[typography.body1, { color: colors.textMuted }]}>
            ✏️ {t('feed.startPost')}
          </Text>
        </TouchableOpacity>
      </View>

      <InfiniteList<Post>
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => toggleLikePost(item.id)}
            onComment={() => onNavigateToPostDetails(item.id)}
            onRepost={() => {}}
            onShare={() => {}}
          />
        )}
        onLoadMore={() => {}}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createTrigger: {
    borderWidth: 1,
  },
  triggerBtn: {
    width: '100%',
  },
});
