import { router } from "expo-router";
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { decodeCardUrl } from '@/utils/cardUrl';
import { useCardContext } from '@/contexts/CardContext';

export function DeepLinkHandler() {
  const { updateCardData } = useCardContext();

  useEffect(() => {
    const handleUrl = async ({ url }: { url: string }) => {
      const cardData = await decodeCardUrl(url);
      if (cardData) {
        updateCardData(cardData);
        router.push('/(tabs)/create/index');
      }
    };

    Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleUrl({ url });
      }
    });

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  return null;
}