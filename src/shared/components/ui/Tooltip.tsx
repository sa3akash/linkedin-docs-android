import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = memo(({ text, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => setVisible((v) => !v)}>
      {children}
      {visible && (
        <View style={styles.tooltipBox}>
          <Text style={styles.tooltipText}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  tooltipBox: {
    position: 'absolute',
    bottom: '100%',
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
