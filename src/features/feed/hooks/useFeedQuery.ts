import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedApi } from '../../../services/api/feed';
import { CreatePostPayload, Post } from '../../../types/feed.types';

export const FEED_QUERY_KEY = ['feed'];

export const useFeedQuery = () => {
  const queryClient = useQueryClient();

  const infiniteFeed = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await feedApi.getFeed(pageParam, 10);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const createPostMutation = useMutation({
    mutationFn: (newPost: CreatePostPayload) => feedApi.createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => feedApi.likePost(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });

      const previousFeed = queryClient.getQueryData(FEED_QUERY_KEY);

      queryClient.setQueryData(FEED_QUERY_KEY, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            items: page.items.map((post: Post) => {
              if (post.id === postId) {
                const isLiked = post.isLiked;
                return {
                  ...post,
                  isLiked: !isLiked,
                  likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
                };
              }
              return post;
            }),
          })),
        };
      });

      return { previousFeed };
    },
    onError: (_err, _postId, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(FEED_QUERY_KEY, context.previousFeed);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
    },
  });

  return {
    ...infiniteFeed,
    posts: infiniteFeed.data?.pages.flatMap((page) => page.items) ?? [],
    createPost: createPostMutation.mutateAsync,
    isCreatingPost: createPostMutation.isPending,
    likePost: likePostMutation.mutate,
  };
};
