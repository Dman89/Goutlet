/* eslint-disable prettier/prettier */
import messages from './messages';
import {
    cookbookIconSRC,
    searchIconSRC,
    plannerSRC,
    pantryIconSRC,
} from './images';
export const icons = [
    {
        title: messages.pantry.defaultMessage,
        icon: pantryIconSRC,
        urlValue: 0,
        url: 'pantry',
    },
    {
        title: messages.cookbook.defaultMessage,
        icon: cookbookIconSRC,
        urlValue: 1,
        url: 'cookbook',
    },
    {
        title: messages.explore.defaultMessage,
        icon: searchIconSRC,
        urlValue: 2,
        url: 'explore',
    },
    {
        title: messages.planner.defaultMessage,
        icon: plannerSRC,
        urlValue: 3,
        url: 'planner',
    },
];
