import { Message } from '@google-cloud/pubsub';
import axios from 'axios';

export const openUrl = async (message: Message) => {
  if (!message.data || !Buffer.isBuffer(message.data)) {
    console.error('No data or invalid data format in message');
    return;
  }

  try {
    const decodedData = message.data.toString('utf-8');

    let payload;
    try {
      payload = JSON.parse(decodedData);
    } catch (error) {
      console.error('Failed to parse message data:', error);
      return;
    }
    if (!payload.url) {
      console.error('No URL provided in the message');
      return;
    }

    const url = payload.url;

    try {
      const response = await axios.get(url);
      console.log(`Accessed ${url} with status: ${response.status}`);
    } catch (error) {
      console.error(`Error accessing ${url}: `, error);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};