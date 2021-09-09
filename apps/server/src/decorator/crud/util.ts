export function cloneDecorators(from, to) {
  Reflect.getMetadataKeys(from).forEach((key) => {
    const value = Reflect.getMetadata(key, from);
    Reflect.defineMetadata(key, value, to);
  });
}
export function clonePropDecorators(from, to, name) {
  Reflect.getMetadataKeys(from, name).forEach((key) => {
    const value = Reflect.getMetadata(key, from, name);
    Reflect.defineMetadata(key, value, to, name);
  });
}
