import { isNumber, isString } from 'lodash';
import add from 'date-fns/add';
import { LiteralType } from '~/constants/literalType';
import { isShortDatesRangeValid } from '~/helpers/datesHelpers';
import { and, between, empty, equals, like } from '~/helpers/query';
import { FilterDto, QueryRequest } from '~/shared/models';
import { AnyObject } from '~/types/common';
import { ShortDateUtils, SpecialISODateUtils } from '~/types/timeNominalTypes';
import { isDefined } from '~/helpers/guards';
import { FieldEditor } from '../constants';

/**
 * Формируем строку запроса для компилятора
 */

export const useCreateParams = (filters:AnyObject, list:Array<FilterDto>): QueryRequest => {    
    const selectQueryRequest= (name:string, value:any): QueryRequest => {
        let filter = list.find( el => el.field === name);
        console.log(filter);
        if (isDefined(filter))
        {
            switch (filter.editor) 
            {
                case FieldEditor.NUMBER:
                case FieldEditor.LIST:
                {
                    return equals(name, value, LiteralType.NUMBER);
                }
                case FieldEditor.TEXT:
                {
                    return like(name, '%'+value+'%', LiteralType.STRING);
                }
                case FieldEditor.DATE_RANGE:
                {
                    if (isShortDatesRangeValid(value))
                    {
                        const [start, end] = value.split(' - ');
                        const startDate = SpecialISODateUtils.format(
                            add(ShortDateUtils.parse(start), { hours: 0, minutes: 0, seconds: 0 })
                        );
                        const endDate = SpecialISODateUtils.format(
                                            add(ShortDateUtils.parse(end), { hours: 23, minutes: 59, seconds: 59 })
                                        );
                        console.log({startDate, endDate});
                        return between(name, startDate, endDate, LiteralType.DATE);
                    }
                    else
                    {
                        return empty(); 
                    }
                }
                default:
                {
                    return equals(name, value, LiteralType.NONE);
                }
            }
        }
        return empty();
    };
    const requests = Array<QueryRequest>();
    Object.entries(filters).map(([name, value]) => (
        requests.push(selectQueryRequest(name, value))
    ));
    return (requests.length > 1) ? and(requests) : requests[0];
};
