let currentFunction = null;

export function addCommit(ctx, next) {
  if (
    typeof currentFunction === 'function' &&
    typeof currentFunction.commit === 'function'
  ) {
    currentFunction.commit();
    currentFunction = null;
  }

  Object.defineProperty(ctx, 'commit', {
    set: (fn) => {
      currentFunction = fn;
    },
    get: () => currentFunction,
  });

  next();
}
