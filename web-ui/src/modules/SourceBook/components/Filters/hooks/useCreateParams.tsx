import { useState } from 'react';
import { and, like } from '~/helpers/query';
import { QueryRequest } from '~/shared/models';
import { AnyObject } from '~/types/common';


export const useCreateParams = (filters:AnyObject): QueryRequest => {
    const [requests, setRequests] = useState(Array<QueryRequest>());
    Object.entries(filters).map(([name, value]) => (
        setRequests(requests.concat(like(name, value,'string')))
    ));
    console.log(requests);
    return {};
    /*
    if (requests.length > 1)
    {
       
    }
    else
    {
        return requests[0];
    }
*/
};
