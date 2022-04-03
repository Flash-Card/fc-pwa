import * as Sentry from '@sentry/browser';

const ENV = process.env.NODE_ENV;
if (ENV !== 'development') {
  Sentry.init({
    dsn: "https://5076bb9d9d5d4649af9bd02288fb91d7@o351264.ingest.sentry.io/6307251",
    environment: ENV,
  });
}

export enum EEventsTag {
  IDB = 'INDEXED_DB',
  ORDER = 'ORDER',
  TRANSACTION = 'TRANSACTION',
}

export function enrichMessage(message: string, meta?: any, tag?: EEventsTag) {
  Sentry.withScope(scope => {
    if (typeof tag === 'string') {
      scope.setTag('source', tag);
    }
    if (meta) {
      scope.setExtra('data', JSON.stringify(meta, null, 2));
    }
    Sentry.captureMessage(message);
  });
}

export function enrichException(error: any, meta?: any, tag?: EEventsTag) {
  Sentry.withScope(scope => {
    if (typeof tag === 'string') {
      scope.setTag('source', tag);
    }
    if (meta) {
      scope.setExtra('data', JSON.stringify(meta, null, 2));
    }
    Sentry.captureException(error);
  });
}
