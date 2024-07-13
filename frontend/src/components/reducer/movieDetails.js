let initialState = [];

const getDetails = (state=initialState, action)=>{
    switch(action.type)
    {
        case 'SEND':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default getDetails;