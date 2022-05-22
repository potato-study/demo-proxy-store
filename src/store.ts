import { useEffect, useState, useSyncExternalStore } from "react";

const VERSION = Symbol('verison');
const SUBSCRIBERS = Symbol('subscribers');

type Subscriber = () => void;
type UnSubscribe = () => void;

export function proxy<T>(initialObject: T): T;
export function proxy<T extends object>(initialObject: T): T {
  let version = 0;
  const subscribers = new Set<Subscriber>();
  initialObject[VERSION] = version;
  initialObject[SUBSCRIBERS] = subscribers;

  const proxyObject = new Proxy(initialObject, {
    set(target, prop, value) {
      target[prop] = value;
      target[VERSION] = ++version; 
      target[SUBSCRIBERS].forEach(subscriber => subscriber());
      return true;
    }
  });
  return proxyObject;
}

const snapshotMap = new Map<object, [version: number, snapshot: object]>();

function snapshot<T>(proxyObject: T): T;
function snapshot<T extends object>(proxyObject: T) {
  const version = proxyObject[VERSION];
  const snapshot = snapshotMap.get(proxyObject);
  if(snapshot?.[0] === version) {
   return snapshot[1];
  }
  const lastSnapshot = {...proxyObject};
  snapshotMap.set(proxyObject, [version, lastSnapshot]);
  return lastSnapshot;
}

function subscribe<T extends object>(proxyObject: T, subscriber: Subscriber): UnSubscribe;
function subscribe<T extends object>(proxyObject: T, subscriber: Subscriber): UnSubscribe {
  proxyObject[SUBSCRIBERS].add(subscriber);
  const unSubscribe = () => proxyObject[SUBSCRIBERS].delete(subscriber);
  return unSubscribe;
}

export function useSnapshot<T extends object>(proxyObject: T): T;
export function useSnapshot<T extends object>(proxyObject: T): T {
  const [state, setState] = useState<T>(snapshot(proxyObject));

  useEffect(() => {
    const unSubscribe = subscribe(proxyObject, () => {
      const nextState = snapshot(proxyObject);
      setState(nextState);
    });
    return unSubscribe;
  }, []);

  return state;
}
