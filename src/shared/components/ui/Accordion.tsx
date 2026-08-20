import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../core/theme/tokens';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = memo(({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={() => setExpanded((e) => !e)}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text style={styles.accordionArrow}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
});

const styles = StyleSheet.create({
  accordionContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 4,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: colors.surface,
  },
  accordionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  accordionArrow: {
    fontSize: 12,
    color: colors.textMuted,
  },
  accordionBody: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
});
