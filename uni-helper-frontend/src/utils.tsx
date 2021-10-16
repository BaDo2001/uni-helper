// eslint-disable-next-line import/prefer-default-export
export function classNames(...classes: (false | null | undefined | string)[]) {
    return classes.filter(Boolean).join(' ');
}
