import {Dispatch, SetStateAction} from 'react';

export type RatingProps = {
    rating: number;
    yourRating: string;
    setRating: Dispatch<SetStateAction<number>>;
    setYourRating: Dispatch<SetStateAction<string>>;
};
