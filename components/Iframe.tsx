"use client";
import { Suspense, useLayoutEffect, useRef, useState } from "react";
import { PageSkeleton } from "./Skeletons";

type IFrameProps = React.ComponentPropsWithRef<"iframe"> & {
  fallback?: JSX.Element;
};

export function IFrame(props: IFrameProps) {
  const { fallback, ...rest } = props;

  return (
    <Suspense fallback={fallback || <PageSkeleton />}>
      <IFrameImplementation {...rest} />
    </Suspense>
  );
}

function IFrameImplementation(props: React.ComponentPropsWithRef<"iframe">) {
  const awaiter = useRef<null | {
    promise: null | Promise<void>;
    resolve: () => void;
    reject: () => void;
  }>(null);
  const [, triggerLoad] = useState(false);
  if (awaiter.current?.promise) {
    throw awaiter.current.promise;
  }
  useLayoutEffect(() => {
    if (awaiter.current === null) {
      awaiter.current = {
        promise: new Promise<void>((resolve, reject) => {
          if (awaiter.current) {
            Object.assign(awaiter.current, { resolve, reject });
          }
        }),
        resolve: () => {},
        reject: () => {},
      };
      triggerLoad(true);
    }
  }, []);
  const { title } = props;
  return (
    <iframe
      {...props}
      title={title}
      onLoad={(e) => {
        if (awaiter.current) {
          awaiter.current.promise = null;
          awaiter.current?.resolve();
        }
        props.onLoad?.(e);
      }}
      onError={(err) => {
        if (awaiter.current) {
          awaiter.current.promise = null;
          awaiter.current?.reject();
        }
        props.onError?.(err);
      }}
    />
  );
}

export default IFrame;
