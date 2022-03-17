import { Conversation } from '../../types/conversation'
import { isConversationSender } from '../conversationUtils'

describe('isConversationSender', () => {
  const defaultValue: Omit<Conversation,'recipientId' | 'senderId'> = {id:1, lastMessageTimestamp: 0, recipientNickname: 'toto', senderNickname: 'tata'};
  it('should return false if is not the sender', () => {
    expect(isConversationSender({...defaultValue, recipientId: 1, senderId: 2}, '1')).toEqual(false);
  });
  it('should return true if is the sender', () => {
    expect(isConversationSender({...defaultValue, recipientId: 1, senderId: 2}, '2')).toEqual(true);
  })
})