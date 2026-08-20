import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Post } from '../../types/feed.types';
import { useTheme } from '../../hooks/useTheme';

export interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onRepost, onShare }) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
          marginBottom: spacing.md,
        },
        shadows.sm,
      ]}
    >
      {/* Author Header */}
      <View style={styles.authorRow}>
        {post.author.avatarUrl ? (
          <Image source={{ uri: post.author.avatarUrl }} style={[styles.avatar, { borderRadius: radius.round }]} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: colors.primary, borderRadius: radius.round },
            ]}
          >
            <Text style={[typography.subtitle2, { color: colors.textInverse }]}>
              {post.author.firstName.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.authorMeta}>
          <Text style={[typography.subtitle2, { color: colors.textPrimary }]}>
            {post.author.firstName} {post.author.lastName}
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
            {post.author.headline}
          </Text>
          <Text style={[typography.overline, { color: colors.textMuted }]}>{post.createdAt}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={[typography.body2, { color: colors.textPrimary, marginVertical: spacing.sm }]}>
        {post.content}
      </Text>

      {/* Media Attachments */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <Image
          source={{ uri: post.mediaUrls[0] }}
          style={[styles.postMedia, { borderRadius: radius.sm, marginVertical: spacing.xs }]}
          resizeMode="cover"
        />
      )}

      {/* Engagement Counter */}
      <View style={[styles.statsRow, { borderBottomColor: colors.border }]}>
        <Text style={[typography.caption, { color: colors.textMuted }]}>
          👍 {post.likesCount} • {post.commentsCount} comments • {post.repostsCount} reposts
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
          <Text style={[typography.button, { color: post.isLiked ? colors.primary : colors.textSecondary }]}>
            {post.isLiked ? '👍 Liked' : '👍 Like'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} style={styles.actionBtn}>
          <Text style={[typography.button, { color: colors.textSecondary }]}>💬 Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRepost} style={styles.actionBtn}>
          <Text style={[typography.button, { color: post.isReposted ? colors.secondary : colors.textSecondary }]}>
            🔁 Repost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.actionBtn}>
          <Text style={[typography.button, { color: colors.textSecondary }]}>🚀 Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorMeta: {
    flex: 1,
    marginLeft: 10,
  },
  postMedia: {
    width: '100%',
    height: 220,
  },
  statsRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
});
