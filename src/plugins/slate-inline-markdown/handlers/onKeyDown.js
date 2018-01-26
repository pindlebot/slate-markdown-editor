import onSpace from './onSpace'

export default function onKeyDown(
  opts,
  event,
  change,
  editor,
) {
  const args = [opts, event, change, editor];
  if (event.key == ' ') return onSpace(...args)
  return undefined;
} 