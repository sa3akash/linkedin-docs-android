import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../core/theme/tokens';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = memo(({ items }) => (
  <View style={styles.timelineContainer}>
    {items.map((item, index) => (
      <View key={item.id} style={styles.timelineRow}>
        <View style={styles.timelineIndicator}>
          <View style={styles.timelineDot} />
          {index < items.length - 1 && <View style={styles.timelineLine} />}
        </View>
        <View style={styles.timelineContent}>
          <Text style={styles.timelineTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>}
          {item.timestamp && <Text style={styles.timelineTime}>{item.timestamp}</Text>}
        </View>
      </View>
    ))}
  </View>
));

const styles = StyleSheet.create({
  timelineContainer: {
    paddingVertical: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  timelineSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  timelineTime: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
});
