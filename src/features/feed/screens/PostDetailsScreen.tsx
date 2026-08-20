import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useFeedStore } from '../../../stores/feed.store';
import { PostCard, TextInput, PrimaryButton } from '../../../components';
import { feedApi } from '../api/feed.api';
import { Comment } from '../../../types';

export interface PostDetailsScreenProps {
  postId: string;
}

export const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ postId }) => {
  const { colors, spacing, typography } = useTheme();
  const post = useFeedStore((state) => state.posts.find((p) => p.id === postId));
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    feedApi.getPostComments(postId).then(setComments);
  }, [postId]);

  if (!post) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[typography.body1, { color: colors.textSecondary }]}>Post not found</Text>
      </View>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const commentObj: Comment = {
      id: `c_${Date.now()}`,
      postId,
      author: {
        id: 'u_101',
        email: 'alex.morgan@linkedin.com',
        firstName: 'Alex',
        lastName: 'Morgan',
        headline: 'Software Engineer',
        connectionCount: 500,
        experiences: [],
        education: [],
        skills: [],
        certificates: [],
      },
      content: newComment,
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };
    setComments([commentObj, ...comments]);
    setNewComment('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <PostCard post={post} />

      <View style={{ padding: spacing.md }}>
        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
          Comments ({comments.length})
        </Text>

        <TextInput
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <PrimaryButton
          title="Comment"
          onPress={handleAddComment}
          disabled={!newComment.trim()}
          style={{ marginBottom: spacing.lg }}
        />

        {comments.map((comment) => (
          <View
            key={comment.id}
            style={[
              styles.commentItem,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                padding: spacing.md,
                marginBottom: spacing.xs,
              },
            ]}
          >
            <Text style={[typography.subtitle2, { color: colors.textPrimary }]}>
              {comment.author.firstName} {comment.author.lastName}
            </Text>
            <Text style={[typography.body2, { color: colors.textSecondary }]}>
              {comment.content}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentItem: {
    borderWidth: 1,
    borderRadius: 8,
  },
});
