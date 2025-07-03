/**
 * WebSocket event types.
 */
export type WebSocketEvent =
  /** Sent when a user connects to the app (e.g. on login or tab open) */
  | "USER_CONNECT"

  /** Sent when a user disconnects or closes the app */
  | "USER_DISCONNECT"

  /** Notifies others in the channel that the user is typing */
  | "USER_TYPING"

  /** Notifies others that the user stopped typing */
  | "USER_STOP_TYPING"

  /** Used when user sets presence (e.g. "away", "do not disturb", "offline") */
  | "USER_UPDATE_STATUS"

  /** Sent when a new channel is created */
  | "CHANNEL_CREATE"

  /** Sent when channel info (name, topic, etc.) is changed */
  | "CHANNEL_UPDATE"

  /** Sent when a channel is deleted */
  | "CHANNEL_DELETE"

  /** Sent when a user joins a channel */
  | "CHANNEL_JOIN"

  /** Sent when a user leaves or is removed from a channel */
  | "CHANNEL_LEAVE"

  /** Broadcast a new message to everyone in a channel */
  | "MESSAGE_SEND"

  /** Update an existing message’s content */
  | "MESSAGE_EDIT"

  /** Remove a message from the channel */
  | "MESSAGE_DELETE"

  /** Add a reaction (emoji) to a message */
  | "MESSAGE_REACTION_ADD"

  /** Remove a reaction from a message */
  | "MESSAGE_REACTION_REMOVE"

  /** Sent when a new thread is started from a message */
  | "THREAD_CREATE"

  /** Sent when someone replies to a thread */
  | "THREAD_REPLY"

  /** Direct message sent between users */
  | "PRIVATE_MESSAGE_SEND"

  /** Sent when a DM is read (for read receipts) */
  | "PRIVATE_MESSAGE_READ"

  /** Server pushes a notification (e.g. @mention, new DM) */
  | "NOTIFICATION_RECEIVE"

  /** User dismisses or marks the notification as seen */
  | "NOTIFICATION_DISMISS"

  /** Update the online/offline state of a user (used for green dots, etc.) */
  | "PRESENCE_UPDATE";
