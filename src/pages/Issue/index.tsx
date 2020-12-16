import { useRoute } from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';

interface Params {
  issueUrl: string;
}

const Issue: React.FC = () => {
  const route = useRoute();
  const params = route.params as Params;

  return (
    <WebView style={{ flex: 1 }} source={{ uri: params.issueUrl }} />
  );
}

export default Issue;