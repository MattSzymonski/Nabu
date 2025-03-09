import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function HelloWidget({ sentence  }: { sentence: string }) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}
    >
      <TextWidget
        text={sentence}
        style={{
          fontSize: 18,
          fontFamily: 'Inter',
          color: '#000000',
          textAlign: 'center',
        }}
      />
    </FlexWidget>
  );
}
