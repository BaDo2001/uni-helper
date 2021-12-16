import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useDeleteSubjectMutation } from '../../../../generated-typings/graphql-types';
import { useMessageContext } from '../../../contexts/MessageContext';
import Popup from '../../layout/Popup';

export interface Props {
    subjectId: string;
}

const SubjectSettingsButton: React.FC<Props> = ({ subjectId }) => {
    const [showPopup, setShowPopup] = useState(false);
    const button = useRef<HTMLButtonElement>(null);
    const { addMessage } = useMessageContext();

    const [deleteFn] = useDeleteSubjectMutation({
        variables: {
            id: subjectId,
        },
        refetchQueries: ['SubjectPagination'],
    });

    const useDelete = async () => {
        const { errors } = await deleteFn();

        if (errors) {
            errors.forEach((error) => {
                addMessage({ id: uuid(), type: 'ERROR', message: error.message });
            });
        } else {
            addMessage({ id: uuid(), type: 'SUCCESS', message: 'Subject was successfuly deleted.' });
        }

        setShowPopup(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => {
                    setShowPopup(!showPopup);
                }}
                type="button"
                className="px-2 cursor-pointer"
                ref={button}
            >
                <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            <div className="absolute left-8 -top-2">
                <Popup
                    show={showPopup}
                    onClose={() => {
                        setShowPopup(false);
                    }}
                    initiator={button.current}
                >
                    <ul>
                        <li className="border-b bg-blue-500 text-white text-center">
                            <Link className="w-24 h-10 flex justify-center items-center font-medium" to={`/subjects/${subjectId}`}>
                                Edit
                            </Link>
                        </li>
                        <li className="bg-red-500 text-white text-center">
                            <button onClick={useDelete} className="w-24 h-10 font-medium" type="button">Delete</button>
                        </li>
                    </ul>
                </Popup>
            </div>
        </div>
    );
};

export default SubjectSettingsButton;
