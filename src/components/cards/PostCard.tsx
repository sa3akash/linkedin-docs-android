import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Post } from '../../types/feed.types';
import { useStyles } from '../../hooks/useStyles';
import { Theme } from '../../theme';

export interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onRepost, onShare }) => {
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;

  return (
    <View style={styles.card}>
      {/* Author Header */}
      <View style={styles.authorRow}>
        {post.author.avatarUrl ? (
          <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={[typography.subtitle2, styles.placeholderText]}>
              {post.author.firstName.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.authorMeta}>
          <Text style={[typography.subtitle2, styles.nameText]}>
            {post.author.firstName} {post.author.lastName}
          </Text>
          <Text style={[typography.caption, styles.headlineText]} numberOfLines={1}>
            {post.author.headline}
          </Text>
          <Text style={[typography.overline, styles.timeText]}>{post.createdAt}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={[typography.body2, styles.contentText]}>{post.content}</Text>

      {/* Media Attachments */}
      {post.mediaUrls && post.mediaUrls.length > 0 ? (
        <Image source={{ uri: post.mediaUrls[0] }} style={styles.postMedia} resizeMode="cover" />
      ) : null}

      {/* Engagement Counter */}
      <View style={styles.statsRow}>
        <Text style={[typography.caption, styles.statsText]}>
          👍 {post.likesCount} • {post.commentsCount} comments • {post.repostsCount} reposts
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
          <Text style={[typography.button, post.isLiked ? styles.likedText : styles.actionText]}>
            {post.isLiked ? '👍 Liked' : '👍 Like'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} style={styles.actionBtn}>
          <Text style={[typography.button, styles.actionText]}>💬 Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRepost} style={styles.actionBtn}>
          <Text style={[typography.button, post.isReposted ? styles.repostedText : styles.actionText]}>
            🔁 Repost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.actionBtn}>
          <Text style={[typography.button, styles.actionText]}>🚀 Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    ...theme.shadows.sm,
  },
  authorRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.round,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  placeholderText: {
    color: theme.colors.textInverse,
  },
  authorMeta: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    color: theme.colors.textPrimary,
  },
  headlineText: {
    color: theme.colors.textSecondary,
  },
  timeText: {
    color: theme.colors.textMuted,
  },
  contentText: {
    color: theme.colors.textPrimary,
    marginVertical: theme.spacing.sm,
  },
  postMedia: {
    width: '100%' as const,
    height: 220,
    borderRadius: theme.radius.sm,
    marginVertical: theme.spacing.xs,
  },
  statsRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statsText: {
    color: theme.colors.textMuted,
  },
  actionsRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingTop: 8,
  },
  actionBtn: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 4,
  },
  actionText: {
    color: theme.colors.textSecondary,
  },
  likedText: {
    color: theme.colors.primary,
  },
  repostedText: {
    color: theme.colors.secondary,
  },
});
