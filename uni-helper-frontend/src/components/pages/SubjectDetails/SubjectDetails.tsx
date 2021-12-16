import type { GraphQLError } from 'graphql';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import type { ICreateOneSubjectSchemaInput } from '../../../../generated-typings/graphql-types';
import {
    useSubjectByIdQuery,
    useCreateSubjectMutation,
    useUpdateSubjectMutation,
} from '../../../../generated-typings/graphql-types';
import { useMessageContext } from '../../../contexts/MessageContext';
import Input from '../../Input';
import Spinner from '../../Spinner';

export interface Props {
    subjectId?: string;
}

const SubjectDetails: React.FC<Props> = ({ subjectId }) => {
    const history = useHistory();

    const { data, loading } = useSubjectByIdQuery({
        variables: { id: subjectId },
        skip: !subjectId,
    });

    const [createFn] = useCreateSubjectMutation({
        refetchQueries: ['SubjectPagination'],
    });
    const [updateFn] = useUpdateSubjectMutation({
        refetchQueries: ['SubjectPagination'],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { addMessage } = useMessageContext();

    const onSubmit = async (formData: ICreateOneSubjectSchemaInput) => {
        let requestErrors: readonly GraphQLError[] | undefined;
        let message: string;

        if (subjectId) {
            ({ errors: requestErrors } = await updateFn({
                variables: {
                    id: subjectId,
                    record: formData,
                },
            }));

            message = 'Subject was successfuly updated.';
        } else {
            ({ errors: requestErrors } = await createFn({
                variables: {
                    record: formData,
                },
            }));

            message = 'Subject was successfuly created.';
        }

        if (requestErrors) {
            requestErrors.forEach((error) => {
                addMessage({ id: uuid(), type: 'ERROR', message: error.message });
            });
        } else {
            addMessage({ id: uuid(), type: 'SUCCESS', message });
        }

        history.push('/admin');
    };

    if (loading) {
        return <Spinner />;
    }

    const subject = data?.SubjectById;

    return (
        <div className="h-full flex justify-center items-center">
            <form className="bg-white shadow-2xl w-2/3 p-8" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-8 font-bold text-center text-lg">{subject ? 'Update subject' : 'Register a new subject'}</h1>

                <Input name="name" label="Subject name:" register={register} errors={errors} value={subject?.name} required />

                <Input name="neptunId" label="Neptun ID:" register={register} errors={errors} value={subject?.neptunId} required />

                <Input
                    name="credits"
                    label="Credits:"
                    register={register}
                    errors={errors}
                    value={subject?.credits}
                    inputType="number"
                    required
                />

                <Input name="university" label="University:" register={register} errors={errors} value={subject?.university} required />

                <Input name="faculty" label="Faculty:" register={register} errors={errors} value={subject?.faculty} required />

                <button type="submit" className="mt-8 font-medium bg-blue-500 text-white leading-10 px-8 block mx-auto">
                    {subject ? 'Update' : 'Create subject'}
                </button>
            </form>
        </div>
    );
};

export default SubjectDetails;
