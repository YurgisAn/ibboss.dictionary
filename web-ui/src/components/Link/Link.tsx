import { useHistory, useLocation } from '@vtb-ermo/router';
import { Link as AdmiralLink, LinkProps } from '@vtb/ui-kit3';
import React, { FC, MouseEvent } from 'react';

export const Link: FC<LinkProps> = ({ onClick, ...restProps }) => {
    const history = useHistory();
    const location = useLocation();

    const isSelected = (() => {
        const regexp = RegExp(`^${restProps.href?.replace(/\/$/, '')}/{0,1}$`, 'gi');
        const splitterHref = restProps.href?.split('/') ?? [];
        const splitterPathname = location.pathname?.split('/') ?? [];
        const thirdPartsAreEqual =
            splitterPathname[3] && splitterHref[3] ? splitterPathname[3] === splitterHref[3] : false;

        return !!location.pathname?.match(regexp)?.length || thirdPartsAreEqual;
    })();

    const handlerOnClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        history.push(event.currentTarget.getAttribute('href') || '');
        event.preventDefault();
    };

    return (
        <AdmiralLink {...restProps} onClick={handlerOnClick} appearance={isSelected ? 'primary' : 'secondary'}>
            {restProps.children}
        </AdmiralLink>
    );
};
