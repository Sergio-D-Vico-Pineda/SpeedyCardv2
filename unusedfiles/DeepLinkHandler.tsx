import { router } from "expo-router";
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';

function DeepLinkHandler() {
  const { updateCardData } = useCardContext();

  useEffect(() => {
    const handleUrl = async ({ url }: { url: string }) => {
      // const cardData = await decodeCardUrl(url);

      /* if (cardData) {
        updateCardData(cardData);
        router.push('/(tabs)/create/index');
      } */
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleUrl({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
}