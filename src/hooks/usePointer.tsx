import {
  addClass,
  attr,
  find,
  getDomFromPointer,
  removeAttr,
  removeClass,
} from "@/helpers/dom.helpers";
import { ClickActions, GreenevilleBJJObject } from "@/types/base.types";
import { useCallback, useEffect, useRef } from "react";

const getEventDetails = (ev: GreenevilleBJJObject) => ({
  elem: ev.target,
  button: ev.button,
  clientX: ev.clientX,
  clientY: ev.clientY,
  ctrlKey: ev.ctrlKey,
  layerX: ev.layerX,
  layerY: ev.layerY,
  movementX: ev.movementX,
  movementY: ev.movementY,
  offsetX: ev.offsetX,
  offsetY: ev.offsetY,
  pageX: ev.pageX,
  pageY: ev.pageY,
  type: ev.pointerType,
  pressure: ev.pressure,
  screenX: ev.screenX,
  screenY: ev.screenY,
  shiftKey: ev.shiftKey,
  eventType: ev.type,
  x: ev.x,
  y: ev.y,
});

export interface ClickProperties extends ClickActions {
  element: GreenevilleBJJObject;
}

export const usePointerEvent = (props: ClickProperties) => {
  const hasActions = Object.values(props).some(
    (value) => typeof value === "function" && props.element !== undefined
  );

  if (!hasActions) {
    return;
  }

  const {
    element,
    active,
    onPress,
    onOut,
    onMove,
    onUp,
    onDown,
    onOver,
    groupId,
    selected,
  } = props;

  const elemHelper = useRef(null);
  const clickingRef = useRef({ isClicking: false });
  const handlersRef = useRef<ClickProperties>({
    element,
    active: selected ? false : active,
    onPress,
    onOut,
    onMove,
    onUp,
    onDown,
    onOver,
    groupId,
    selected,
  });
  const onActionOver = useCallback((ev: GreenevilleBJJObject) => {
    if (elemHelper.current) {
      addClass(elemHelper.current, "GreenevilleBJJ-hover");
    }
    handlersRef.current?.onOver?.(ev);
  }, []);

  const onActionMove = useCallback((ev: GreenevilleBJJObject) => {
    if (elemHelper.current) {
      addClass(elemHelper.current, "GreenevilleBJJ-hover");
    }
    handlersRef.current?.onMove?.(ev);
  }, []);

  const onActionLeave = useCallback((ev: GreenevilleBJJObject) => {
    if (elemHelper.current) {
      removeClass(elemHelper.current, "GreenevilleBJJ-hover");
    }
    handlersRef.current?.onOut?.(ev);
  }, []);

  const onActionStart = useCallback((ev: GreenevilleBJJObject) => {
    if (clickingRef.current?.isClicking || ev.button > 0) {
      return;
    }
    if (elemHelper.current) {
      if (!handlersRef.current?.selected) {
        addClass(elemHelper.current, "GreenevilleBJJ-active");
      }
    }
    onDown?.(ev);
    clickingRef.current.isClicking = true;
  }, []);

  const onActionEnd = useCallback((ev: GreenevilleBJJObject) => {
    if (clickingRef.current?.isClicking) {
      onUp?.(ev);

      if (elemHelper.current) {
        removeClass(elemHelper.current, "GreenevilleBJJ-active");
        removeClass(elemHelper.current, "GreenevilleBJJ-hover");
      }

      if (groupId) {
        const items = find(
          document.documentElement,
          `[GreenevilleBJJ-gid="${groupId}"]`
        );
        items.forEach((item: GreenevilleBJJObject) => {
          try {
            item.classList.remove("GreenevilleBJJ-group-active");
          } catch {
            /** */
          }
        });

        if (elemHelper.current) {
          if (!handlersRef.current?.selected) {
            addClass(elemHelper.current, "GreenevilleBJJ-group-active");
          }
        }
      }

      clickingRef.current.isClicking = false;
    }
  }, []);

  const onActionClick = useCallback((ev: GreenevilleBJJObject) => {
    handlersRef.current?.onPress?.(getEventDetails(ev));

    if (elemHelper.current) {
      removeClass(elemHelper.current, "GreenevilleBJJ-active");
      removeClass(elemHelper.current, "GreenevilleBJJ-hover");
    }

    if (groupId) {
      const items = find(
        document.documentElement,
        `[GreenevilleBJJ-gid="${groupId}"]`
      );
      items.forEach((item: GreenevilleBJJObject) => {
        try {
          item.classList.remove("GreenevilleBJJ-group-active");
        } catch {
          /** */
        }
      });

      if (elemHelper.current) {
        if (!handlersRef.current?.selected) {
          addClass(elemHelper.current, "GreenevilleBJJ-group-active");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (element) {
      const elemCurrent = getDomFromPointer(element);
      if (elemCurrent) {
        if (groupId) {
          if (active) {
            if (!handlersRef.current?.selected) {
              addClass(elemCurrent, "GreenevilleBJJ-group-active");
            }
          }
        }

        elemHelper.current = elemCurrent;
        addClass(elemCurrent, "GreenevilleBJJ-click");

        if (handlersRef.current?.onPress) {
          addClass(elemCurrent, "GreenevilleBJJ-click");
          if (
            handlersRef.current.onMove ||
            handlersRef.current.onOver ||
            handlersRef.current.onOut
          ) {
            addClass(elemCurrent, "GreenevilleBJJ-interaction");
          }

          if (active) {
            if (!handlersRef.current?.selected) {
              addClass(elemCurrent, "GreenevilleBJJ-group-active");
            }
          }

          if (groupId) {
            attr(elemCurrent, "GreenevilleBJJ-gid", groupId);
          }

          elemCurrent.removeEventListener("pointerdown", onActionStart, false);
          elemCurrent.addEventListener("pointerdown", onActionStart, {
            capture: true,
            passive: true,
          });

          elemCurrent.removeEventListener("pointerup", onActionEnd, false);
          elemCurrent.addEventListener("pointerup", onActionEnd, {
            capture: true,
            passive: true,
          });

          elemCurrent.removeEventListener("click", onActionClick, false);
          elemCurrent.addEventListener("click", onActionClick, {
            capture: true,
            passive: true,
          });

          elemCurrent.removeEventListener("pointerover", onActionOver, false);
          elemCurrent.addEventListener("pointerover", onActionOver, {
            capture: true,
            passive: true,
          });

          elemCurrent.removeEventListener("pointermove", onActionMove, false);
          elemCurrent.addEventListener("pointermove", onActionMove, {
            capture: true,
            passive: true,
          });

          elemCurrent.removeEventListener("pointerleave", onActionLeave, false);
          elemCurrent.addEventListener("pointerleave", onActionLeave, {
            capture: true,
            passive: true,
          });
        }
      }
    }

    return () => {
      if (hasActions) {
        const elemCurrent = getDomFromPointer(element);
        if (elemCurrent) {
          removeClass(elemCurrent, "GreenevilleBJJ-click");
          removeClass(elemCurrent, "GreenevilleBJJ-hover");
          if (groupId) {
            removeAttr(elemCurrent, "GreenevilleBJJ-gid");
          }

          elemCurrent.removeEventListener("pointerdown", onActionStart, false);
          elemCurrent.removeEventListener("pointerup", onActionEnd, false);
          elemCurrent.removeEventListener("click", onActionClick, false);
          elemCurrent.removeEventListener("pointerover", onActionOver, false);
          elemCurrent.removeEventListener("pointerleave", onActionLeave, false);
          elemCurrent.removeEventListener("pointermove", onActionMove, false);
        }
      }
    };
  }, []);
};
