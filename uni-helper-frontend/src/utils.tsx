// eslint-disable-next-line import/prefer-default-export
export function classNames(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
