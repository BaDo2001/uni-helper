import type { HTMLInputTypeAttribute } from 'react';
import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface Props<T> {
    label: string;
    name: `${string}`;
    register: UseFormRegister<{ [key: string]: any }>;
    errors?: {};
    value?: T;
    inputType?: HTMLInputTypeAttribute;
    required?: boolean;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const Input = <T, >({ label, name, register, errors, value, inputType, required }: Props<T>) => (
    <label className="mb-4 block relative">
        {label}
        <input
            className="block mt-2 p-2 border w-full"
            {...register(name, { required: required ? 'This is required.' : false, value, valueAsNumber: inputType === 'number' })}
            type={inputType}
        />
        <div className="text-red-600 bottom-0 h-6">
            <ErrorMessage errors={errors} name={name} />
        </div>
    </label>
);

export default Input;
