import { GreenevilleBJJObject } from "@/types/base.types";
import { PublishOptions } from "@/types/device.types";

const listenerMap: Record<string, Map<symbol, EventListener>> = {};

export const isChannelActive = (eventName: string) => {
  return !!listenerMap[eventName];
};

export const subscribeToChannel = async <T = GreenevilleBJJObject>(
  channelName: string,
  onMessage: ((data: T) => void) | null
): Promise<symbol> => {
  const uniqueListenerId = Symbol();
  const _callBack = onMessage;

  const _internalCallback = (event: Event) => {
    if (event instanceof CustomEvent) {
      const _detailData: T = event.detail;
      if (_callBack) {
        _callBack(_detailData);
      }
    }
  };

  window.addEventListener(
    channelName as keyof WindowEventMap,
    _internalCallback
  );

  if (!listenerMap[channelName]) {
    listenerMap[channelName] = new Map();
  }

  listenerMap[channelName].set(uniqueListenerId, _internalCallback);

  return uniqueListenerId;
};

export const disposeChannel = async (
  channelName: string,
  listenerId: symbol
) => {
  const channelListeners = listenerMap[channelName];

  if (channelListeners && channelListeners.has(listenerId)) {
    try {
      const listener = channelListeners.get(listenerId);
      if (listener) {
        window.removeEventListener(channelName, listener);
        channelListeners.delete(listenerId);
      }

      if (channelListeners.size === 0) {
        delete listenerMap[channelName];
      }
    } catch {
      /** */
    }
  }
};

export const publishOnChannel = async <T = GreenevilleBJJObject>(
  channelName: string,
  data: T,
  options?: PublishOptions
) => {
  window.dispatchEvent(
    new CustomEvent(channelName, {
      bubbles: options?.bubbles ?? true,
      cancelable: options?.cancelable ?? false,
      detail: data,
    })
  );
};

export const addClass = (
  elem: GreenevilleBJJObject,
  value: GreenevilleBJJObject
) => {
  if (!elem?.classList || typeof value !== "string") return;

  const classNames = value.split(" ");
  for (const className of classNames) {
    elem.classList.add(className);
  }
};

export const removeClass = (
  elem: GreenevilleBJJObject,
  value: GreenevilleBJJObject
) => {
  if (!elem?.classList || typeof value !== "string") return;

  const classNames = value.split(" ");
  for (const className of classNames) {
    elem.classList.remove(className);
  }
};

export const find = (
  elem: GreenevilleBJJObject,
  searchFor: GreenevilleBJJObject
) => {
  return elem?.querySelectorAll(searchFor) || [];
};

export const attr = (
  elem: GreenevilleBJJObject,
  key: GreenevilleBJJObject,
  value?: GreenevilleBJJObject
) => {
  if (!elem?.setAttribute || !elem?.getAttribute || typeof key !== "string")
    return;

  if (value !== undefined) {
    elem.setAttribute(key, value);
  } else {
    return elem.getAttribute(key);
  }
};

export const removeAttr = (
  elem: GreenevilleBJJObject,
  key: GreenevilleBJJObject
) => {
  if (!elem?.removeAttribute || typeof key !== "string") return;

  try {
    elem.removeAttribute(key);
  } catch {
    /** Handle any potential exceptions */
  }
};

export const getDomFromPointer = (obj: GreenevilleBJJObject) => {
  if (obj?.current) {
    return obj.current.base || obj.current;
  }

  return null;
};
