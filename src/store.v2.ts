import { useEffect, useState } from "react";

type Subscriber = () => void;
type UnSubscibe = () => void;

export function store() {
  let version = 0;
  let lastVersion;
  let lastSnapshot;
  const subscribers = new Set<Subscriber>();

  function proxy<S extends object>(initialObject: S): S {
    const proxyObject = new Proxy(initialObject, {
      set(target, prop, value) {
        ++version;
        target[prop] = value;
        subscribers.forEach((s) => s());
        return true;
      }
    });
    return proxyObject;
  }

  function subscribe(subscriber: Subscriber): UnSubscibe {
    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  }

  function snapshot<S extends object>(proxyObject: S): S {
    if (lastVersion !== version) {
      lastVersion = version;
      lastSnapshot = { ...proxyObject };
    }
    return lastSnapshot;
  }

  function useSnapshot<S extends object>(proxyObject: S): S {
    const [state, setState] = useState<S>(snapshot(proxyObject));

    useEffect(() => {
      const unSubscribe = subscribe(() => {
        const nextState = snapshot(proxyObject);
        setState(nextState);
      });
      return unSubscribe;
    }, [proxyObject, setState]);
    return state;
  }

  return [proxy, useSnapshot];
}
