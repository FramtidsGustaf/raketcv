// Since deep signal returns a proxy object, we need to convert it to a normal object
// Perhaps it's possible to use a different approach to avoid this conversion but can't find anything in the documentation

export const getValues = (proxyObject: any) => {
  return JSON.parse(JSON.stringify(proxyObject));
};
